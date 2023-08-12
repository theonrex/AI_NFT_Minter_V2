import React, { useState } from "react";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";
import axios from "axios";
import Image from "next/image";
import { Spinner } from "@chakra-ui/spinner";
import { aiftAddress, aiftabi } from "../../constant";
import styles from "./mint.module.css";

const MintNFT = () => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [mintingNFT, setMintingNFT] = useState(false);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [url, setURL] = useState<string | null>(null);
  const [showMetamaskAlert, setShowMetamaskAlert] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const createAIImage = async () => {
    setTimeout(() => {
      setStatus("Generating The Image");
      setType("info");
      setShowMetamaskAlert(true);
    }, 5000);

    setMessage("Generating Image...");
    setLoadingImage(true);

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    try {
      const response = await axios.post(
        URL,
        {
          inputs: description,
          options: { wait_for_model: true },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_API_KEYS}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      setMessage("Getting Data From Hugging Face API...");

      const type = response.headers["content-type"];
      const data = response.data;

      const base64data = Buffer.from(data).toString("base64");
      const imgData = `data:${type};base64,` + base64data;

      setMessage("Displaying the Image...");

      setImg(imgData);
      setLoadingImage(false);

      return data;
    } catch (error) {
      console.log("error -> " + error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (name === "" || description === "") {
        window.alert("Please provide both name and description");
        return;
      }

      setMintingNFT(true);
      console.log("AI Image Started ");

      const imgData = await createAIImage();
      console.log("AI Image completed ");

      const tokenURI = await uploadImage(imgData);

      if (tokenURI) {
        await mintAIFT(tokenURI);
      } else {
        console.error("Token URI is undefined");
      }

      setMintingNFT(false);
    } catch (error) {
      console.log("error -> " + error);
    }
  };

  const uploadImage = async (imageData: ArrayBuffer) => {
    try {
      setTimeout(() => {
        setStatus("Uploading Image to IPFS");
        setType("info");
        setShowMetamaskAlert(true);
      }, 5000);

      console.log("Upload Image to IPFS Started ");
      const nftstorage = new NFTStorage({
        token: `${process.env.NEXT_PUBLIC_STORAGE_API_KEY}`,
      });

      const { ipnft } = await nftstorage.store({
        image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
        name: name,
        description: description,
      });

      const imageUrl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
      setURL(imageUrl);
      console.log("Upload Image to IPFS finished ");
      console.log(ipnft);
      return imageUrl;
    } catch (error) {
      console.log("Upload Image Error -> ", error);
    }
  };

  const mintAIFT = async (tokenURI: string) => {
    setMintingNFT(true);
    try {
      setTimeout(() => {
        setStatus("Minting the AIFT.....");
        setType("info");
        setShowMetamaskAlert(true);
      }, 4000);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(aiftAddress, aiftabi, signer);
      const tx = await contract.createNFT(tokenURI);
      await tx.wait();

      console.log(tx);

      setMintingNFT(false);

      const transactionHash = tx.hash;
      signer.provider.on(transactionHash, (receipt) => {
        setTimeout(() => {
          setStatus("AIFT Minted Successfully");
          setType("success");
          setShowMetamaskAlert(true);
        }, 4000);
      });
    } catch (error) {
      console.log(error);

      setStatus("Transaction Rejected.... Please Try Again... ");
      setType("error");
      setShowMetamaskAlert(true);
    }
  };

  return (
    <div className={`container mx-auto ai_body`}>
      <div className={`${styles.form} `}>
        <div className={`${styles.nftGenerator}`}>
          <div className={styles.nav__brand}>
            <h1>AI NFT Generator</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Give a name...."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Give Description...."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input
              type="submit"
              value="Create & Mint"
              className={styles.create_mint}
            ></input>
          </form>
        </div>

        <div className={styles.AI_Image}>
          {!loadingImage && img ? (
            <Image
              src={img}
              alt="AI generated Image"
              width={500}
              height={500}
            />
          ) : loadingImage ? (
            <div className="image__placeholder">
              <Spinner animation="border" />
              <p>{message} </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {!loadingImage && url && (
        <p className={styles.url}>
          <a href={url} target="_blank" rel="noreferrer">
            View Metadata
          </a>
        </p>
      )}
    </div>
  );
};

export default MintNFT;

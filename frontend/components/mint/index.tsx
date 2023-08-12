import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import axios from "axios";
import styles from "./mint.module.css";
import { useSigner } from "@thirdweb-dev/react";
import Image from "next/image";
import { Spinner } from "@chakra-ui/spinner";
import Navigation from "./Navigation";
import NFT from "../../abis/NFT.json";
import config from "../../config.json";

function MintPage() {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [nft, setNFT] = useState<ethers.Contract | null>(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [url, setURL] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const signer = useSigner();

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();

      const nftContract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        NFT,
        provider
      );
      setNFT(nftContract);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      setMessage("Error loading blockchain data. Please check the console.");
    }
  };

  const mintImage = async (tokenURI: string) => {
    setMessage("Waiting for mint");

    try {
      if (!provider || !signer || !nft) {
        throw new Error("Blockchain data not initialized");
      }

      const transaction = await nft.connect(signer).mint(tokenURI, {
        value: ethers.utils.parseUnits("0.1", "ether"),
      });
      await transaction.wait(1);
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMessage("Error minting NFT. Please check the console.");
      throw error;
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }

    try {
      setIsWaiting(true);
      const imageData = await createImage();
      const imageUrl = await uploadImage(imageData);
      await mintImage(imageUrl);
      setIsWaiting(false);
      setMessage("");
    } catch (error) {
      console.error("Error submitting:", error);
      setMessage("Error submitting. Please check the console.");
      setIsWaiting(false);
    }
  };

  const createImage = async () => {
    setMessage("Generating Image...");

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    const requestData = {
      inputs: description,
      options: { wait_for_model: true },
    };

    try {
      const response = await axios.post<Buffer>(URL, requestData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

      const type = response.headers["content-type"];
      const data = response.data;

      const base64data = Buffer.from(data).toString("base64");
      const img = `data:${type};base64,` + base64data;
      setImage(img);

      return data;
    } catch (error) {
      console.error("Error creating image:", error);
      setMessage("Error creating image. Please check the console.");
      throw error;
    }
  };

  const uploadImage = async (imageData: Uint8Array) => {
    setMessage("Uploading Image....");

    const nftStorage = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
    });

    try {
      const { ipnft } = await nftStorage.store({
        image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
        name: name,
        description: description,
      });

      const imageUrl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
      setURL(imageUrl);

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image. Please check the console.");
      throw error;
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className={`container mx-auto ai_body`}>
      <div className={`${styles.form} `}>
        <div className={`${styles.nftGenerator}`}>
          <Navigation account={account} setAccount={setAccount} />
          <form onSubmit={submitHandler}>
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
          {!isWaiting && image ? (
            <Image
              src={image}
              alt="AI generated Image"
              width={500}
              height={500}
            />
          ) : isWaiting ? (
            <div className="image__placeholder">
              <Spinner animation="border" />
              <p>{message} </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {!isWaiting && url && (
        <p className={styles.url}>
          <a href={url} target="_blank" rel="noreferrer">
            View Metadata
          </a>
        </p>
      )}
    </div>
  );
}

export default MintPage;

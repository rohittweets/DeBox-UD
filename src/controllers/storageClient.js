import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

export default function makeStorageClient() {
  const token = process.env.REACT_APP_WEB3_KEY;

  return new Web3Storage({ token });
}

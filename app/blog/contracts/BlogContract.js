import { getWeb3 } from "../../common/web3";
import BlogABI from "./abi/Blog.json";
import BlogConfig from "../config/blog.json";

const { web3, web3Events } = getWeb3();

export const Blog = new web3.eth.Contract(BlogABI, BlogConfig.address);
export const BlogEvents = new web3Events.eth.Contract(BlogABI, BlogConfig.address);

Blog.methods.addPost("QmU2yr8CQfrd26Yghjx2xGdg8ZdmRKRSwcD7eBgpvL91xf").call()

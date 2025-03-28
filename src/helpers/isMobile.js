import { UAParser } from "ua-parser-js";


export const isMobile = () => {
  const parser = new UAParser();
  const deviceType = parser.getDevice().type;
  return deviceType == 'mobile';
}
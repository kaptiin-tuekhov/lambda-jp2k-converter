import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { convertPNG } from "../convertPng";

it("Converts .dcm to .png", () => {
  const dicomPath = resolve(__dirname, "../../image-000001.dcm");
  const pngPath = resolve(__dirname, "../../image-000001.png");
  const dicomBuffer = readFileSync(dicomPath);
  const parseCb = (err, buffer) => {
    expect(err).toBeUndefined();
    writeFileSync("image-000001.png", buffer);
  };
  convertPNG(dicomBuffer, "image-000001.dcm", parseCb);
});
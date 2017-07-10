import * as gm from "gm";

const im = gm.subClass({imageMagick: true});

export function convertPNG(data: Buffer, imageName: string, cb: Function) {
  return gm(data, imageName)
    .toBuffer("PNG", (err, buffer) => {
      if (err) cb(err, undefined);
      cb(undefined, buffer);
    });
}
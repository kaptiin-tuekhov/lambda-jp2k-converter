import * as gm from "gm";

const im = gm.subClass({imageMagick: true});

export default function convertPNG(data: Buffer, imageName: string) {
  return gm(data, imageName)
    .toBuffer('PNG', (err, buffer) => {
      if (err) throw err
      return buffer
    })
}
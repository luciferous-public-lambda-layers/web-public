import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import type { PublicLayer, RawSourceData, SourceData } from "@/models";

type CallableLoadSourceData = () => Promise<SourceData>;

async function execLoadSourceData(): Promise<SourceData> {
  const client = new S3Client();
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_SOURCE_DATA,
    Key: process.env.KEY_SOURCE_DATA,
  });
  const resp = await client.send(command);
  const text = await resp.Body?.transformToString();
  if (text == null) {
    throw new Error("empty source data");
  }
  const raw = JSON.parse(text) as RawSourceData;
  return {
    identifiers: raw.layers.map((item) => item.identifier),
    mapping: raw.layers.reduce(
      (obj, item) => {
        obj[item.identifier] = item;
        return obj;
      },
      {} as { [key: string]: PublicLayer },
    ),
  };
}

function generateLoadSourceData(): CallableLoadSourceData {
  let data: SourceData | null = null;

  async function loadSourceData(): Promise<SourceData> {
    if (data == null) {
      data = await execLoadSourceData();
    }
    return data;
  }

  return loadSourceData;
}

export const loadSourceData = generateLoadSourceData();

import { Metadata } from "next";
import Image from "next/image";

import { LayerList } from "@/components/server/layer_list";
import { PROJECT_TITLE } from "@/utils/variables";

export const metadata: Metadata = {
  title: PROJECT_TITLE,
};

export default async function Home() {
  const lines = [
    "AWS LambdaのPythonランタイム向けに、PyPIのモジュールをPublic Layerとして用意しました。",
    "ご利用の際は、リージョン、アーキテクチャ、Pythonランタイムのバージョンに合わせて、該当するLayerを選択してください。",
  ].map((v, i) => <p key={`describe-line-${i}`}>{v}</p>);
  return (
    <div>
      <h2 className="title">Luciferous Public Layers</h2>
      <div className="card">
        <div className="card-content">{lines}</div>
      </div>
      <h3 className="subtitle">Layers</h3>
      <LayerList />
    </div>
  );
}

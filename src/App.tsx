import { useState } from "react"
import './App.css'
import Setting from "./components/Setting";
import { DownloadSimpleIcon, XIcon } from "@phosphor-icons/react";
import html2canvas from "html2canvas";
import { useRef } from "react";

function App() {
  const base = import.meta.env.BASE_URL;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [spoderman, setSpoderman] = useState({
    background: "#ccf9ff",
    skin: "#FFFFFF",
    cosmetics: {
      hair: {
        value: 0,
        total: __HAIR_COUNT__
      },
      eyes: {
        value: 0,
        total: __EYES_COUNT__
      },
      mouth: {
        value: 0,
        total: __MOUTH_COUNT__
      },
      clothing: {
        value: 0,
        total: __CLOTHING_COUNT__
      }
    },
  })

  const { cosmetics: { hair, eyes, mouth, clothing } } = spoderman;


  const handleDownload = async () => {
    if (!canvasRef.current) return;
    const canvas = await html2canvas(canvasRef.current, { useCORS: true });
    const link = document.createElement("a");
    link.download = "spoderman.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleChange = (key: string, newVal: number) => {
    setSpoderman(prev => {
      const setting = prev.cosmetics[key as keyof typeof prev.cosmetics];
      const clamped = Math.max(0, Math.min(newVal, setting.total - 1));
      return {
        ...prev,
        cosmetics: {
          ...prev.cosmetics,
          [key]: { ...setting, value: clamped }
        }
      };
    });
  };

  return (
    <>
      <h1>mek spoderman</h1>

      <div className="flex w-full justify-center gap-4">
        <div id="settings" className="w-50">
          {Object.entries(spoderman.cosmetics).map(([key, setting]) => (
            <Setting
              key={key}
              label={key}
              setting={{ currentValue: setting.value, total: setting.total }}
              handleChange={(_, newVal) => handleChange(key, newVal)}
            />
          ))}
          <div className="space-x-2">
            <label htmlFor="background">Skin</label>
            <input type="color" id="skin" value={spoderman.skin} onChange={(e) => setSpoderman(prev => ({ ...prev, skin: e.target.value }))} />
          </div>
          <div className="space-x-2">
            <label htmlFor="background">Background</label>
            <input type="color" id="background" value={spoderman.background} onChange={(e) => setSpoderman(prev => ({ ...prev, background: e.target.value }))} />
            <button className="border w-fit h-4.5" onClick={() => setSpoderman(prev => ({ ...prev, background: "transparent" }))}><XIcon className="text-red-500" /></button>
          </div>
        </div>

        <div ref={canvasRef} className="w-75 relative *:w-75 h-78.5" style={{ backgroundColor: spoderman.background }}>
          <img src={`${base}spoderman/hair/hair_${hair.value}.png`} className="absolute z-6" />
          <img src={`${base}spoderman/eyes/eyes_${eyes.value}.png`} className="absolute z-4" />
          <img src={`${base}spoderman/mouth/mouth_${mouth.value}.png`} className="absolute z-6" />
          <img src={`${base}spoderman/clothing/clothing_${clothing.value}.png`} className="absolute z-3" />
          <>
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id="skin-color">
                  <feFlood floodColor={spoderman.skin} result="color" />
                  <feComposite in="color" in2="SourceGraphic" operator="in" />
                </filter>
              </defs>
            </svg>

            <img
              src="/spoderman/skin.png"
              className="absolute z-2"
              style={{ filter: "url(#skin-color)" }}
            />
          </>
          <img src={`${base}spoderman/base.png`} className="absolute z-4" />
        </div>
      </div>

      <button className="mt-4 bg-slate-800 p-2 w-fit mx-auto flex gap-2 items-center" onClick={handleDownload}>
        <DownloadSimpleIcon size={25} />
        downlod</button>
    </>
  )
}

export default App

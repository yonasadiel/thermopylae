import { Key, useRef } from "react";
import { useSettings } from "../../hooks";

const TerminalSettings = (): React.ReactElement<any, any> => {
  const { settings, setSettingValue } = useSettings();
  const newURLRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div className="input-group">
        <label>Sources</label>
        {settings.terminalURLs.map((url: string, index: Key) => (
          <div>
            <input key={index} type="text" value={url} disabled></input>
            <button
              onClick={() => {
                setSettingValue(
                  "terminalURLs",
                  settings.terminalURLs.filter((_, i) => i !== index)
                );
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <input type="text" ref={newURLRef} placeholder="url"></input>
        <button
          onClick={() => {
            setSettingValue("terminalURLs", [
              ...settings.terminalURLs,
              newURLRef.current?.value as string,
            ]);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TerminalSettings;

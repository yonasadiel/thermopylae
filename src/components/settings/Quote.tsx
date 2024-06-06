import { useSettings } from "../../hooks";

const QuoteSettings = (): React.ReactElement<any, any> => {
  const { settings } = useSettings();

  return (
    <div className="background-settings">
      <label>Quotes</label>
      <div className="input-group">
        {settings.quotes.map((quote, index) => (
          <div key={index} className="input-row">
            <input
              type="text"
              value={quote.text}
              onChange={(e) => {
                settings.quotes[index].text = e.target.value;
              }}
            />
            <input
              type="text"
              value={quote.subtext}
              onChange={(e) => {
                settings.quotes[index].subtext = e.target.value;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteSettings;

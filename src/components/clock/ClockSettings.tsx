import { useSettings } from '../../hooks';
import { Clock } from '../../models/clock';
import './Clock.css';

const ClockSettings = () => {
    const { settings, setSettingValue } = useSettings();
    const handleAddClock = () => {
        const defaultOption = Intl.DateTimeFormat().resolvedOptions();
        setSettingValue('clocks', [...settings.clocks, { title: 'My Place', timezone: defaultOption.timeZone }]);
    }
    const handleUpdateClock = (idx: number, c: Clock) =>
        setSettingValue('clocks', [...settings.clocks.slice(0, idx), c, ...settings.clocks.slice(idx+1)]);
    const handleDeleteClock = (idx: number) =>
        setSettingValue('clocks', [...settings.clocks.filter((_, i) => i !== idx)]);

    return (
        <div className="clock-settings">
            <div className="input-group">
                <label>General</label>
                <p>
                    <input
                        type="checkbox"
                        checked={settings.clocks12Hour}
                        onChange={(e) => setSettingValue('clocks12Hour', e.currentTarget.checked)}/>
                    <span>Use 12 Hour format</span>
                </p>
            </div>
            <div className="input-group">
                <label>Clocks</label>
                {settings.clocks.map((clock, idx) => (
                    <div key={idx} className="custom-row">
                        <div>
                            <input
                                type="text"
                                value={clock.title}
                                placeholder="Local"
                                onChange={(e) => handleUpdateClock(idx, { ...clock, title: e.currentTarget.value })} />
                            <input
                                type="text"
                                value={clock.timezone}
                                placeholder="Asia/Singapore"
                                onChange={(e) => handleUpdateClock(idx, { ...clock, timezone: e.currentTarget.value })} />
                            <button
                                type="button"
                                className="delete"
                                onClick={() => handleDeleteClock(idx)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                <p>
                    <button
                        type="button"
                        onClick={() => handleAddClock()}>
                        add
                    </button>
                </p>
            </div>
        </div>
    );
}

export default ClockSettings;

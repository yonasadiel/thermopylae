import { useSettings } from '../../hooks';
import { Quote } from '../../models/quote';
import './Clock.css'

const Quote = () => {
    const now = new Date();
    const { settings } = useSettings();

    return (
        <div className="clock">
            {settings.clocks?.map((timezoneSetting) => {
                const time = getTimeInTimezone(now, timezoneSetting.timezone, settings.clocks12Hour);
                const splitted = time.split(' ');
                return (
                    <div className="clock-timezone">
                        <p className="time">{splitted[0]}{splitted.length > 1 && <span className="ampm">{splitted[1]}</span>}</p>
                        <p className="city">{timezoneSetting.title}</p>
                    </div>
                );
            })}
        </div>
    );
}

const getTimeInTimezone = (now: Date, timezone: string, is12Hour: boolean) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: is12Hour,
        timeZone: timezone,
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(now);
}

export default Quote;

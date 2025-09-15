import { useEffect, useState } from 'react';
import { useSettings } from '../../hooks';
import './Clock.css';

const Clock = () => {
    const [now, setNow] = useState(new Date());
    const { settings } = useSettings();

    useEffect(() => {
        setNow(new Date());
        const interval = setInterval(() => { setNow(new Date()) }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            {settings.clocks?.map((timezoneSetting) => {
                const time = getTimeInTimezone(now, timezoneSetting.timezone, settings.clocks12Hour);
                if (!time) {
                    return null;
                }
                const splitted = time.split(' ');
                return (
                    <div className="clock-timezone" key={timezoneSetting.title}>
                        <p className="time">{splitted[0]}{splitted.length > 1 && <span className="ampm">{splitted[1]}</span>}</p>
                        <p className="city">{timezoneSetting.title}</p>
                    </div>
                );
            })}
        </div>
    );
}

const getTimeInTimezone = (now: Date, timezone: string, is12Hour: boolean): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: is12Hour,
        timeZone: timezone,
    };
    try {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(now);
    } catch (e) {
        console.error(`unable to format time in timezone ${timezone}`, e);
        return '';
    }
}

export default Clock;

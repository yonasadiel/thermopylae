declare module 'particles.js' {
    interface ParticlesJS {
        (tagId: string, params: an, callback: () => void): void;
        load(tagId: string, pathConfigJson: string, callback: () => void): void;
    }

    const particlesJS: ParticlesJS;
    export default particlesJS;
}

interface Window {
    particlesJS: ParticlesJS;
}

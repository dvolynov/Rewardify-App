export function getColor(progress) {
    let r, g, b;
    if (progress < 50) {
        const percent = progress / 50;
        r = Math.round(239 + (234 - 239) * percent);
        g = Math.round(68 + (179 - 68) * percent);
        b = Math.round(68 + (8 - 68) * percent);
    } else {
        const percent = (progress - 50) / 50;
        r = Math.round(234 + (34 - 234) * percent);
        g = Math.round(179 + (197 - 179) * percent);
        b = Math.round(8 + (94 - 8) * percent);
    }
    return `rgb(${r}, ${g}, ${b})`;
}
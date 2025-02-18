type RGB = {
r: number;
g: number;
b: number;
};

type HSL = {
h: number;
s: number;
l: number;
};

// Utility functions to convert colors
export function hexToRgb(hex: string): RGB {
const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    }
    : { r: 0, g: 0, b: 0 };
}

export function rgbToHsl(rgb: RGB): HSL {
let { r, g, b } = rgb;
r /= 255;
g /= 255;
b /= 255;

const max = Math.max(r, g, b);
const min = Math.min(r, g, b);
let h = 0,
    s,
    l = (max + min) / 2;

if (max === min) {
    h = s = 0;
} else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
    case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
    case g:
        h = (b - r) / d + 2;
        break;
    case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
}

return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
};
}

export function hexToHsl(hex: string): string {
const rgb = hexToRgb(hex);
const hsl = rgbToHsl(rgb);
return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

// Theme type definitions
type ThemeColors = {
main: {
    background: string;
    currentLine: string;
    selection: string;
    foreground: string;
    comment: string;
};
accent: {
    cyan: string;
    green: string;
    orange: string;
    pink: string;
    purple: string;
    red: string;
    yellow: string;
    cursor: string;
};
components: {
    button: {
    primary: {
        background: string;
        hover: string;
        text: string;
    };
    secondary: {
        background: string;
        border: string;
        text: string;
    };
    };
    input: {
    background: string;
    border: string;
    borderFocus: string;
    text: string;
    placeholder: string;
    };
    border: {
    default: string;
    soft: string;
    };
};
};

export const darkTheme: ThemeColors = {
main: {
    background: "#1F1F2E",
    currentLine: "#2A2A3A",
    selection: "#34344C",
    foreground: "#E6E6E8",
    comment: "#7B8390",
},
accent: {
    cyan: "#3CAEA3",
    green: "#66CDAA",
    orange: "#FF8A5C",
    pink: "#E27D8C",
    purple: "#9F86C0",
    red: "#E06C75",
    yellow: "#E5C07B",
    cursor: "#F8F8F2",
},
components: {
    button: {
    primary: {
        background: "#FF8A5C",
        hover: "#FF9966",
        text: "#F8F8F2",
    },
    secondary: {
        background: "#2A2A3A",
        border: "#34344C",
        text: "#FF8A5C",
    },
    },
    input: {
    background: "#282A3A",
    border: "#34344C",
    borderFocus: "#3CAEA3",
    text: "#E6E6E8",
    placeholder: "#7B8390",
    },
    border: {
    default: "#34344C",
    soft: "#2A2A3A",
    },
},
};

export const lightTheme: ThemeColors = {
main: {
    background: "#F7F7F9",
    currentLine: "#EDEDED",
    selection: "#E0E0E8",
    foreground: "#2E2E2E",
    comment: "#8E8E8E",
},
accent: {
    cyan: "#3CAEA3",
    green: "#66CDAA",
    orange: "#FF8A5C",
    pink: "#E27D8C",
    purple: "#9F86C0",
    red: "#E06C75",
    yellow: "#E5C07B",
    cursor: "#2E2E2E",
},
components: {
    button: {
    primary: {
        background: "#FF8A5C",
        hover: "#FFA06D",
        text: "#FFFFFF",
    },
    secondary: {
        background: "#F2F2F5",
        border: "#DADADA",
        text: "#FF8A5C",
    },
    },
    input: {
    background: "#FFFFFF",
    border: "#DADADA",
    borderFocus: "#3CAEA3",
    text: "#2E2E2E",
    placeholder: "#8E8E8E",
    },
    border: {
    default: "#DADADA",
    soft: "#E5E5E5",
    },
},
};

// CSS Variables map for Tailwind
export const cssVariables = {
"background": "var(--background)",
"current-line": "var(--current-line)",
"selection": "var(--selection)",
"foreground": "var(--foreground)",
"comment": "var(--comment)",
"cyan": "var(--cyan)",
"green": "var(--green)",
"orange": "var(--orange)",
"pink": "var(--pink)",
"purple": "var(--purple)",
"red": "var(--red)",
"yellow": "var(--yellow)",
"cursor": "var(--cursor)",
"btn-primary": "var(--btn-primary)",
"btn-primary-hover": "var(--btn-primary-hover)",
"btn-primary-text": "var(--btn-primary-text)",
"btn-secondary": "var(--btn-secondary)",
"btn-secondary-border": "var(--btn-secondary-border)",
"btn-secondary-text": "var(--btn-secondary-text)",
"input-bg": "var(--input-bg)",
"input-border": "var(--input-border)",
"input-border-focus": "var(--input-border-focus)",
"input-text": "var(--input-text)",
"input-placeholder": "var(--input-placeholder)",
"border": "var(--border)",
"border-soft": "var(--border-soft)",
};


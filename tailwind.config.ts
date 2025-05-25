import { _keyframes } from "#tailwind-config/theme";

export default {
    theme: {
        extend: {
            colors: {
                'white': {
                    '50': '#ffffff',
                    '100': '#efefef',
                    '200': '#dcdcdc',
                    '300': '#bdbdbd',
                    '400': '#989898',
                    '500': '#7c7c7c',
                    '600': '#656565',
                    '700': '#525252',
                    '800': '#464646',
                    '900': '#3d3d3d',
                    '950': '#292929',
                },
                'green': {
                    50: '#f0f9f4',
                    100: '#d5f2e3',
                    200: '#aee6ca',
                    300: '#7edbb2',
                    400: '#54ce9a',
                    500: '#42b983',
                    600: '#379f6f',
                    700: '#2b865c',
                    800: '#216c49',
                    900: '#12392f',
                }
            },
            keyframes: {
                slowSpining: {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
                }
            },
            animation: {
                'slow-spining': 'slowSpining 30s linear infinite',
            }
        }
    },
}
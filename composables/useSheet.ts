let sheetRange = "Genegal!A2:E15";

const getVars = () => {
    const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID;
    const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;
    const TOKEN = localStorage.getItem('access_token');

    return { SPREAD_SHEET_ID, GOOGLE_API_KEY, TOKEN }
}
export async function allRows() {
    const { getCsrfToken, getProviders, getSession, data } = useAuth();
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY, TOKEN } = getVars();
    
    const token = await getCsrfToken();
    const session = await getSession();
    const provider = await getProviders();

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}`
    return await useFetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            access_token: token,
        }
    })
}

export async function getAllSheetByFile(sheetId: string): Promise<any> {
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

    const url = `/api/sheet/get-all`
    const { data, error } = await useFetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            credentials: localStorage.getItem('credentials'),
            sheetId,
        }
    })
    if (data.value)
        return data.value.response;
    if (error.value) {
        if (error.value.statusCode) {
            alert('Please login Google!')
            localStorage.setItem('isAuth', '0')
        }
        throw error;
    }
}

export async function singleRow(row: any) {
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

    const rowRange = `Sheet1!A${row}:D${row}`

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`
    return await useFetch(url)
}
export const useSheet = () => {
    const sheetList = ref<any[]>([]);
    const currentDataSheet = ref<any[]>([]);

    const getSheetData = async (sheetId: string, range: { title: string, start: string, end: string }) => {
        const url = `/api/sheet/get-sheet-data`
        const { data, error } = await useFetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                credentials: localStorage.getItem('credentials'),
                sheetId,
                range,
            }
        })
        if (data.value)
            return data.value.response; // response from the server
        if (error.value) {
            if (error.value.statusCode){
                alert('Please login Google!')
                localStorage.setItem('isAuth', '0')
            }
            throw error;
        }
    }

    const convertSheetToUserObjects = (data: any[]) => {
        return data.map(item => ({
            name: item[0],
            status: item[1] === "TRUE",
            amount: item[2],
            extra: item[3],
            flag: item[4] === "TRUE"
        }));
    }

    const objectToMessage = (data: any[]) => {
        const participants = data.filter(item => item.status).map(item => item.name);
        return `Các lông thủ hôm nay đã tham gia: \n\\- \`${participants.join("`, \n\\- `")}\``;
    }

    return {
        sheetList,
        currentDataSheet,
        convertSheetToUserObjects,
        objectToMessage,
        allRows,
        getAllSheetByFile,
        singleRow,
        getSheetData,
    }
}
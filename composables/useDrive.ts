export const useDrive = () => {
    interface Params {
        q?: string;
        driveId?: string;
        corpus?: string;
        orderBy?: string;
    }

    const params = reactive<Params>({})

    const files = ref<any[]>([]);
    const currentFile = ref<any>({
        name: '',
    });

    const getFiles = async (params: Params): Promise<any> => {
        try {
            const { data, error } = await useFetch('/api/drive/get-files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    credentials: localStorage.getItem('credentials'),
                    params,
                }
            });
            if (data.value)
                return data.value;
            if (error.value) {
                if (error.value.statusCode) {
                    alert('Please login Google!')
                    localStorage.setItem('isAuth', '0')
                }
                throw error;
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    return { params, files, currentFile, getFiles };
}
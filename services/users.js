export const userService = (apiCaller) => {
    const fetchUser = async (params) => {
        let res = await apiCaller.get('users', {params})
        return res.data
    }

    const searchUser = async (params) => {
        let res = await apiCaller.get('search/users', { params })
        return res.data
    }

    const fetchUserInfo = async (uName) => {
        let res = await apiCaller.get(`users/${uName}`)
        return res.data
    }
    
    const fetchUserRepos = async (uName) => {
        let res = await apiCaller.get(`users/${uName}/repos`)
        return res.data
    }
    return {
        fetchUser,
        searchUser,
        fetchUserInfo,
        fetchUserRepos
    }
}
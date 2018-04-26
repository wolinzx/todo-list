const STORAGE_KEY = 'todos-vuejs'
export default {
    fetch () {       
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'); 
    },
    save (items) {
        // JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items)); 
    }
} 
export default {
    fetch (KEY) {
        // window.localStorage.clear();       
        return JSON.parse(window.localStorage.getItem(KEY) || '[]'); 
    },
    save (KEY,items) {
        // JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
        window.localStorage.setItem(KEY,JSON.stringify(items)); 
    }
} 
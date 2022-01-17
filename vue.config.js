
module.exports = {
  transpileDependencies: [
    "vuetify",
    
  ],
  // devServer: {
  //   proxy: {
  //     "^/engine-rest": {
  //       target: "http://192.168.1.53:8080", 
  //       ws: true,       
  //       secure: false,
  //       changeOrigin: true,        
  //     },
  //     "^/api" :{
  //       target: 'http://localhost:8000'
  //     }
  //   },   

  devServer: {
    proxy: {
  //     "^/engine-rest": {
  //       target: "http://192.168.1.53:8080", 
  //       ws: true,       
  //       secure: false,
  //       changeOrigin: true,        
  //     },
        "^/api" :{
          target: 'http://10.100.90.22:8000'
        }
    }
  },
  // devServer: {
  //   proxy: 'http://isms.cgd.go.th/'
  // }
};

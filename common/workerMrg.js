 import config from './../config';
 let instances = {};
 class WorkerMrg {
     constructor() {
        // var bb = new Blob(["importScripts('" + config.workerPath + "');"]);
        // this.worker = new Worker(window.URL.createObjectURL(bb));
        this.worker = new Worker(config.workerPath);
         this.worker.addEventListener('message', this.message);
         this.worker.onerror = function (e) {
             console.log('worker.onerror', e)
         };

     }
     message(e) {
         var data = e.data;
         var hashCode = data.request.hashCode;
         var msgId = data.request.msgId;
         var classPath = data.request.classPath;
         //console.log(TD.workerMrg.instances[classPath], hashCode+'_'+msgId, TD.workerMrg.instances[classPath] && TD.workerMrg.instances[classPath] == hashCode+'_'+msgId)
         if (instances[classPath + '_' + hashCode] && instances[classPath + '_' + hashCode] == hashCode + '_' + msgId) {
             instances[hashCode + '_' + msgId](data.response.data);
         } else {
             instances[hashCode + '_' + msgId] = null;
         }
     }
     /**
      * 发送消息到worker
      * @param {JSON} data 发送的数据
      * @param {Function} callback 返回的回调
      */
     postMessage(data, callback) {
         //console.log('callback', callback)
         var hashCode = data.request.hashCode;
         var msgId = data.request.msgId;
         var classPath = data.request.classPath;
         instances[hashCode + '_' + msgId] = callback;
         //worker队列唯一性判断，
         instances[classPath + '_' + hashCode] = hashCode + '_' + msgId;
         this.worker.postMessage(data);
     }
 }

 export var workerMrg = new WorkerMrg();
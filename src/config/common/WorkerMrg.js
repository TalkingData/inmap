 let instances = {};
 class WorkerMrg {
     constructor() {
         this.worker = null;
         this.workerContent = '[workerContentString]';
         
     }
     create(workerPath) {
         let workerUrl;
         if (this.workerContent.length == 21) {
             workerUrl = workerPath.indexOf('http') > -1 ? URL.createObjectURL(new Blob(['importScripts(\'' + workerPath + '\');'])) : workerPath;
         } else {
             workerUrl = URL.createObjectURL(new Blob([this.workerContent], {
                 type: 'application/javascript'
             }));
         }

         this.worker = new Worker(workerUrl);
         this.worker.addEventListener('message', this.message);
         this.worker.onerror = function (e) {
             /*eslint-disable */
             console.error('worker.onerror', e);
             /*eslint-enable */
         };
     }
     message(e) {
         var data = e.data;
         var hashCode = data.request.hashCode;
         var msgId = data.request.msgId;
         var classPath = data.request.classPath;
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
         if (this.worker == null) {
             this.create('../dist/worker.js');
         }
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
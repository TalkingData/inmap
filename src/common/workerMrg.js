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
         this.worker.onerror = function () {
             throw new TypeError('inMap : worker.onerror');

         };
     }
     message(e) {
         let data = e.data;
         let hashCode = data.request.hashCode;
         let msgId = data.request.msgId;
         let classPath = data.request.classPath;
         let key1 = classPath + '_' + hashCode,
             key2 = hashCode + '_' + msgId;
         if (instances[key1] && instances[key1] == key2) {
             instances[key2](data.request.data);
         }
         data = null, hashCode = null, msgId = null, classPath = null, instances[key2] = null;

     }
     removeMessage(hashCode) {
         for (let o in instances) {
             if (!o) continue;

             let key = o.split('_');
             if (key[0] == hashCode || key[1] == hashCode) {
                 instances[o] = null;
             }

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
         let hashCode = data.request.hashCode;
         let msgId = data.request.msgId;
         let classPath = data.request.classPath;
         let key = hashCode + '_' + msgId;
         instances[key] = callback;
         //worker队列唯一性判断，
         instances[classPath + '_' + hashCode] = key;
         this.worker.postMessage(data);
     }
 }

 export const workerMrg = new WorkerMrg();
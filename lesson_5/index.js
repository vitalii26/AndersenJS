/*1 Ситуация

  1.  button.addEventListener('click', () => {
  2.    Promise.resolve().then(() => console.log('Microtask 1'));
  3.    console.log('Listener 1');
  4.  });
  5.  
  6.  button.addEventListener('click', () => {
  7.    Promise.resolve().then(() => console.log('Microtask 2'));
  8.    console.log('Listener 2');
  9.  });

  Сообщения в консоль будут выведены в таком порядке:
    Listener1 -> Microtask1 -> Listener2 -> Microtask2

  При клике на кнопку изначально выполняется первый addEventListener. Он попадает в стек.
  На второй строчке кода мы резолвим Promise и так, как callback функциия для обработки
  промиса является микрозадачей, то мы ставим callback функцию с console.log('Microtask 1')
  в очередь микрозадач.
  Переходим к 3 строке и console.log('Listener 1') попадает в стек и выполняется. 
  После выполнения console.log('Listener 1') убирается с стека. 
  Первый EventListener отрабатывает, стек освобождается, и переходит к выполнению микрозадач
  из очереди и выполняется console.log('Microtask 1').
  Затем в стек попадает второй addEventListener.
  На 7 строчке резолвится промис и в очередь попадает микрозадача с console.log('Microtask2').
  Выполнение переходит к 8 строчке и выполняется console.log('Listener2').
  После выполнения console.log('Listener2') убирается из стека.
  Второй addEventListener отрабатывает и стек освобождается полностью.
  После освобождения стека выполняется микрозадача с очереди и выводит console.log('Microtask2').

2 Ситуация

  1.    button.addEventListener('click', () => {
  2.      Promise.resolve().then(() => console.log('Microtask 1'));
  3.      console.log('Listener 1');
  4.    });
  5.    
  6.    button.addEventListener('click', () => {
  7.      Promise.resolve().then(() => console.log('Microtask 2'));
  8.      console.log('Listener 2');
  9.    });
  10.  
  11. button.click();

  Сообщения в консоль будут выведены в таком порядке:
    Listener1 -> Listener2 -> Microtask1 -> Microtask2

  Разница с первым варинтом будет в том, что в этом случае клик по кнопке button симулируется с помощью
  метода button.onClick(), который синхронно вызывает события. Он удалится из стека, только тогда,
  когда оба слушателя выполнятся. И соответственно только тогда стек полностью освободится и мы сможем
  выполнить микрозадачи из очереди. Микрозадачи могут выполнятся меджу задачами, когда наш стек пустой.
  И они выплнятся все за раз после освобождения стека.

  Изначально наш script находится в стеке. Затем выполняется синхронный метод button.onClick(),
  который вызывает первый addEventListener. Он точно также попадает в стек как и в первом случае.
  На второй строчке находится промис и поэтому мы ставим callback функцию с console.log('Microtask 1')
  в очередь микрозадач.
  На 3 строке console.log('Listener 1') попадает в стек и выполняется.
  Первый addEventListener отрабатывает и убирается из стека.
  Но так, как стек не пустой, то мы переходим к второму addEventListener и он попадает в стек.
  На 7 строке у нас находится промис и мы записываем его callback функцию с console.log('Microtask2')
  в очередь микрозадач.
  Дальше в стек попадает console.log('Listener 2') и выполняется. После этого он удаляется из стека.
  Дальше из стека удаляется сначала второй addEventListener, потом и script.
  Стек становится пустой и в стеке отрабатываются микрозадачи из очереди.
  Они обрабатыватся в порядке Первый пришел - первый вышел и все за раз.
  Поэтому первым выводится console.log('Microtask 1').
  Затем же будет console.log('Microtask 2').
*/

function fakeRequest(url) {
  return new Promise((res, rej) => {
      const delayTime = Math.floor(Math.random() * 10000) + 1;

      setTimeout(() => res(url), delayTime);
  });
}

function resolveUrlList(urlsArray) {
  const urlRequestResults = [];

  return new Promise((res, rej) => {
    urlsArray.forEach((url) => {
      fakeRequest(url)
        .then((result) => {
          urlRequestResults.push(result);

          if (urlRequestResults.length === urlsArray.length) { 
            res(urlRequestResults);
          }
        })
        .catch((err) => rej(err));
    })
  })
}


const {Readable} = require("stream")

class Fibonacci extends Readable {
  f1 = 0
  f2 = 0

  constructor(options) {
    super({
      // позволяем пользователю определить опции для стрима
      // https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#stream_new_stream_readable_options
      ...options,
      // но некоторые опции мы устанавливаем явно
      // objectMode - включает объектный режим: в NodeJS стримы могут работать в двух режимах - обычном и объектном
      // в первом случае стрим работает с бинарными данными или строками
      // во втором - с любыми JS значениями. В данном случае я хочу что бы стрим работал с числами
      // https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#stream_object_mode
      objectMode: true,

      // эта опция регулирует размер внутреннего буфера стрима.
      // По умолчанию для стрима НЕ в объектном режиме это значение будет равно 16кб
      // (для стримов созданных через fs.createReadStream/fs.createWriteStream - 64кб)
      // Для объектного режима - 16 (значений/объектов)
      highWaterMark: 1,
    });
  }

  _read(size) {
    if (this.f1 === 0) {
      this.f1 = 1
      this.push(1)
    }

    if (this.f1 !== 0 && this.f2 === 0) {
      this.f2 = 1;
      this.push(1)
    }

    const f = this.f1 + this.f2
    this.f1 = this.f2
    this.f2 = f
    this.push(f)
  }
}

// чтение с помощью метода read
(function () {
  const fib = new Fibonacci()

  let n
  while ((n = fib.read()) <= 144) {
    console.log(n)
  }

})();

// чтение с помощью подписки на событие 'data'
(function(){
  const fib = new Fibonacci()
  const read = (n) => {
    console.log(n)
    if (n >= 144) {
      fib.pause()
      fib.off('data', read)
    }
  }

  fib.on('data', read);
})();

// чтение через асинхронный итератор
(async function () {
  const fib = new Fibonacci()
  for await (const n of fib) {
    console.log(n);
    if (n >= 144) {
      break
    }
  }
}());

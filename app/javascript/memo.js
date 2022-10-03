function post (){
  const submit = document.getElementById("submit");//投稿ボタンの要素を所得して「submit」変数に格納
  submit.addEventListener("click", (e) => { //投稿ボタンがクリックされたことを認識
    e.preventDefault(); //既定イベント「投稿ボタンをクリックする」を無効化（重複投稿を防ぐ）
    const form = document.getElementById("form"); //フォームの要素を所得して「form」変数に格納
    const formData = new FormData(form); //新たに生成したFormDataオブジェクトを「formData」変数に格納(フォームの値「content」所得)
    const XHR = new XMLHttpRequest(); //JavaScriptからサーバーサイドにリクエスト
    XHR.open("POST", "/posts", true); //非同期「true」で投稿したメモ(content)をDBへ保存「POST」し、パス先を指定「/posts」
    XHR.responseType = "json"; //レスポンス形式「json」を指定
    XHR.send(formData); //フォームデータをサーバーに送信
  });
};

window.addEventListener('load', post);
const buildHTML = (XHR) => {
  const item = XHR.response.post; //レスポンスの中から投稿されたメモ「content」をitem変数に格納
  //コントローラーcreate内の render json:{ post: post} と紐づいている（このファイルの23行目と連携）
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`; //HTMLとして「html」変数を生成
  return html;
};

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
    XHR.onload = () => { //レスポンスの受信に成功した時の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };//エラーが起きた場合に表示させ、投稿をなしにする
      const list = document.getElementById("list"); //id要素「list」(index.html.erb内)を「list」変数に格納
      const formText = document.getElementById("content"); //id要素「content」(index.html.erb内)を「formText」変数に格納
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); //「list」変数を要素の直後にHTML要素として「html」変数を挿入
      formText.value = ""; //「formText」変数に「記入なし」の値として導入
    };
  });
};

window.addEventListener('load', post);
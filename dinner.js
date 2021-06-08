'use strict';
const dinnerList = document.getElementById('dinner-list'); // html側に表示される候補エリアのエレメント
const dinner = document.getElementById('dinner'); // inputタグに入力された文字列
const addDinnerButton = document.getElementById('add-dinner'); // "ご飯IN!!"のボタン
const decideDinnerButton = document.getElementById('decide-dinner'); // "\\ご飯を決めるなり//"のボタン
const decidedDinnerArea = document.getElementById('decided-dinner-area'); // 決まったご飯を表示するエリア

// ご飯が入ってしまうぅぅ
const dinnerArray = [];

// 候補にご飯を追加する
function addDinner() {
  const dinnerString = dinner.value; // 入力された文字列
  dinner.value = ''; // html側の入力欄を空にする
  if (dinnerString) {
    createParagraph(dinnerString);
    dinnerArray.push(dinnerString); // 入力値を配列に追加
  } else {
    return;
  }
}

// 候補に入ったご飯の中から実際に決める
function decidedDinner() {
  if (confirm('本当に決めていいなり？')) {
    const isDinnerArrayTrue = dinnerArray.length; // dinnerArrayがtrue
    if (isDinnerArrayTrue) { // dinnerArrayに中身が存在するかチェック
      const dinnerIndex = Math.floor(Math.random() * isDinnerArrayTrue); // dinnerArrayからランダムで抽出するためのインデックス
      const extractionDinner = dinnerArray[dinnerIndex];
      decidedDinnerArea.innerText = `今日のご飯は ${extractionDinner} に決まったなり`;
      removeAllChildren(dinnerList); // 親要素直下の（要素）候補を全て削除
      addRedCircle(extractionDinner); // ランダムで抽出された（要素）候補に⭕を付ける
      addDinnerButton.disabled = true; // 一回押したら無効
      decideDinnerButton.disabled = true; // 一回押したら無効
    } else {
      return;
    }
  } else {
    return;
  }
}

/**
 * pタグを生成してその中に文字列を代入
 * @param {String} element pタグに代入する文字列
 */
function createParagraph(element) {
  const p = document.createElement('p'); // dinnerListの直下に子要素として追加するタグを作成
  p.innerText = element; // 作成したpタグに入力値を代入
  dinnerList.appendChild(p); // 実際に子要素に設定
}

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
  }
}

/**
 * 選ばれたご飯（プログラム的には抽出された要素）の候補に⭕を付ける
 * @param {String} extractedElement 抽出されたdinnerArrayの要素
 */
function addRedCircle(extractedElement) {
  dinnerArray.forEach(e => {
    if (e === extractedElement) {
      e += '⭕';
    }
    createParagraph(e);
  });
}

// エンターキーが押されたときもご飯を入力送信できるように
dinner.onkeydown = event => {
  if (event.key === 'Enter') {
    addDinnerButton.click();
  }
}

// ご飯を候補に追加する
addDinnerButton.onclick = addDinner;

// ご飯を決める
decideDinnerButton.onclick = decidedDinner;

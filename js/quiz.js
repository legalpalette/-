// 15の質問データ。各質問は4軸のいずれか1つに対応し、
// dir:1 は回答スコアをそのまま加算、dir:-1 は符号を反転して加算する。
// 軸の記号: 1=O(組織)/I(独立)　2=L(論理)/E(共感)　3=S(安定)/C(挑戦)　4=P(公益)/B(ビジネス)
const questions = [
    { text: "トラブルを未然に防ぐ、静かな戦略家でありたい。", axis: 2, dir: 1 },
    { text: "大きな組織の一員として、役割を全うすることにやりがいを感じる。", axis: 1, dir: 1 },
    { text: "依頼者個人の悩みに寄り添い、感謝されることが最大のモチベーションだ。", axis: 2, dir: -1 },
    { text: "自分の成長のためなら、若いうちは激務や休日対応もいとわない。", axis: 1, dir: -1 },
    { text: "議論では感情や背景よりも、論理と証拠で矛盾を突くことを好む。", axis: 2, dir: 1 },
    { text: "法律だけでなく、ビジネスや経済・経営の仕組みに強く関心がある。", axis: 4, dir: -1 },
    { text: "洗練されたオフィスやスピード感のある環境で働きたい。", axis: 3, dir: -1 },
    { text: "誰もやったことのないルール作りや前例のないスキーム構築を楽しみたい。", axis: 1, dir: -1 },
    { text: "社会全体や国家の正義を預かっているという重圧に耐えたい。", axis: 4, dir: 1 },
    { text: "同じ作業の繰り返しよりも、日々変化のあるスリリングな環境を好む。", axis: 3, dir: -1 },
    { text: "クライアントとはビジネスパートナーとしてクールに付き合いたい。", axis: 2, dir: 1 },
    { text: "お金、数字、M&A、スタートアップといった領域に強く惹かれる。", axis: 4, dir: -1 },
    { text: "逆境に立ったとき、「絶対に勝つ」と闘志が湧くタイプだ。", axis: 3, dir: -1 },
    { text: "大きな組織の歯車として、社会を正しく動かせたときに達成感を感じる。", axis: 4, dir: 1 },
    { text: "仕事における一番の価値は、クライアントが望む未来を自分の手で実現することだ。", axis: 2, dir: -1 }
];

// 16タイプの定義データ。code は4軸（組織/独立・論理/共感・安定/挑戦・公益/ビジネス）を
// O/I, L/E, S/C, P/B の4文字で表したもの。
const TYPES = {
    "OLSP": { name: "鋼の審判官", badge: "公正・克己型", img: "images/characters/01.png",
        desc: "感情に流されず、公正なジャッジを下す胆力が武器。裁判官や検察官のように、組織の中で揺るがない基準を守る仕事に向いています。||司法修習や実務修習を通じて、判断の「軸」を磨く経験を積んでいきましょう。" },
    "OLCP": { name: "正義の執念ハンター", badge: "追跡・尋問型", img: "images/characters/02.png",
        desc: "一つの真実を突き止めるまで粘り強く食らいつくタイプ。検察官や刑事事件専門の弁護士として力を発揮します。||刑事事件を扱う事務所訪問で、証拠と向き合う現場のリアルを聞いてみましょう。" },
    "OLSB": { name: "組織の守護番人", badge: "コンプライアンス型", img: "images/characters/03.png",
        desc: "会社を法的リスクから守る「盾」の存在。インハウスローヤーとして、事業と法律の橋渡し役を担います。||企業内弁護士（インハウス）のキャリアパスや働き方を、先輩訪問で具体的に聞いてみましょう。" },
    "OESP": { name: "公共の街づくり職人", badge: "公益・実装型", img: "images/characters/04.png",
        desc: "地域や社会のインフラを法律面から支える縁の下の力持ち。公設事務所や自治体法務で活躍します。||公設事務所や自治体との連携がある事務所を訪問先候補にしてみましょう。" },
    "ILCB": { name: "国際舞台のタフガイ", badge: "ハイパフォーマンス・挑戦型", img: "images/characters/05.png",
        desc: "激務・高給。英語を駆使し、大規模な企業買収や国際仲裁の最前線で活躍するタイプです。||若いうちから徹底的な基礎体力をつけるため、5大法律事務所やブティック型の専門事務所をターゲットにしましょう。" },
    "OLCB": { name: "企業防衛の策士", badge: "ビジネス・戦略追求型", img: "images/characters/06.png",
        desc: "高度な専門スキルと高い年収を両立。企業の法務戦略を根底から支えるプロフェッショナルです。||ビジネス感覚と法律の専門性を掛け合わせることで、経営陣から絶大な信頼を得られるキャリアパスが描けます。" },
    "ILSB": { name: "テックの守護騎士", badge: "専門特化型", img: "images/characters/07.png",
        desc: "データやテクノロジーの最前線で、新しいルールを実務に落とし込む専門家。個人情報保護やIT法務に強みを持ちます。||IT・知財に強いブティック事務所を訪問し、専門特化のキャリアの築き方を聞いてみましょう。" },
    "OESB": { name: "マネーの司令塔", badge: "財務戦略型", img: "images/characters/08.png",
        desc: "数字とクライアントの未来を結びつける金融・税務のプロ。M&Aや事業承継の場面で頼られる存在です。||税務・金融に強みを持つ事務所への訪問で、専門性の磨き方を学びましょう。" },
    "IECP": { name: "熱血ファイター", badge: "情熱・獅子奮迅型", img: "images/characters/09.png",
        desc: "依頼者のために全力で闘う姿勢が信頼を生む、情熱型の弁護士。刑事弁護や人権問題で力を発揮します。||個人事件や刑事弁護を数多く手がける先輩弁護士に、闘う理由とやりがいを聞いてみましょう。" },
    "ILCP": { name: "真実の洞察家", badge: "分析・探求型", img: "images/characters/10.png",
        desc: "表に出ない事実を丹念に読み解く分析力が武器。刑事弁護や証拠調べで真価を発揮します。||刑事弁護に力を入れる事務所への訪問で、事実認定の緻密なプロセスを学んでみましょう。" },
    "IESB": { name: "労使の調停者", badge: "調整・傾聴型", img: "images/characters/11.png",
        desc: "会社と従業員、双方の言い分に耳を傾けながらバランスを取る労働問題のプロ。人事・労務トラブルの解決を支えます。||労働法に強みを持つ事務所を訪問し、双方の利害を調整する現場のリアルを聞いてみましょう。" },
    "IESP": { name: "心のメディエーター", badge: "共感・対話型", img: "images/characters/12.png",
        desc: "対立する当事者の間に立ち、感情に寄り添いながら解決策を紡ぐ調整役。家事事件や離婚・相続案件で頼られます。||家事事件を専門とする事務所への訪問で、対話による解決のプロセスを聞いてみましょう。" },
    "IECB": { name: "起業家の参謀", badge: "伴走・共創型", img: "images/characters/13.png",
        desc: "創業間もないスタートアップに寄り添い、事業の成長を法務面から支える伴走者。スピード感のある環境を好みます。||スタートアップ支援に力を入れる事務所やベンチャーキャピタル系の法務チームを訪問先候補にしてみましょう。" },
    "OECB": { name: "再生の魔術師", badge: "再生・調整型", img: "images/characters/14.png",
        desc: "経営危機に直面した企業を、利害関係者との対話を通じて立て直す再生のプロフェッショナル。||事業再生・倒産処理に強みを持つ事務所訪問で、修羅場対応のリアルを聞いてみましょう。" },
    "ILSP": { name: "街の相談役", badge: "ワークライフバランス・地域密着型", img: "images/characters/15.png",
        desc: "個人の裁量が大きく、依頼者の顔が直接見えるアットホームな環境。ワークライフバランスも良好です。||地域に根差した法律事務所の訪問や、個人の悩みに向き合う先輩のリアルなやりがいを直に聞いてみましょう。" },
    "OECP": { name: "法廷の勝負師", badge: "熱情・法廷型", img: "images/characters/16.png",
        desc: "法廷という舞台で、論理と情熱の両方でジャッジや陪審の心を動かすタイプ。訴訟対応を得意とします。||訴訟実務に強い事務所を訪問し、法廷での立ち回りをリアルに学んでみましょう。" }
};

let currentQuestion = 0;
const answers = [];

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = questions[currentQuestion].text;

    let progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function answerQuestion(score) {
    answers.push(score);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 4軸（組織/独立・論理/共感・安定/挑戦・公益/ビジネス）のスコアを集計し、
// 16タイプのいずれかに振り分ける。
function computeTypeCode() {
    const axisScores = { 1: 0, 2: 0, 3: 0, 4: 0 };

    questions.forEach((q, i) => {
        axisScores[q.axis] += answers[i] * q.dir;
    });

    let code = "";
    code += axisScores[1] >= 0 ? "O" : "I";
    code += axisScores[2] >= 0 ? "L" : "E";
    code += axisScores[3] >= 0 ? "S" : "C";
    code += axisScores[4] >= 0 ? "P" : "B";
    return code;
}

function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('progress-bar').style.width = `100%`;

    const code = computeTypeCode();
    const type = TYPES[code];
    const [realDesc, hintDesc] = type.desc.split("||");

    const imgEl = document.getElementById('result-image');
    imgEl.src = type.img;
    imgEl.alt = type.name + "のキャラクターイラスト";
    imgEl.onerror = function () { this.style.display = 'none'; };
    imgEl.style.display = '';

    document.getElementById('result-badge').innerText = `診断結果：${type.badge}`;
    document.getElementById('result-title').innerText = type.name;
    document.getElementById('result-desc').innerHTML =
        `<strong>リアルな働き方：</strong>${realDesc}<br><br><strong>キャリアのヒント：</strong>${hintDesc}`;
}

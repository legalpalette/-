// 15の質問データ
const questions = [
    "トラブルを未然に防ぐ、静かな戦略家でありたい。",
    "大きな組織の一員として、役割を全うすることにやりがいを感じる。",
    "依頼者個人の悩みに寄り添い、感謝されることが最大のモチベーションだ。",
    "自分の成長のためなら、若いうちは激務や休日対応もいとわない。",
    "議論では感情や背景よりも、論理と証拠で矛盾を突くことを好む。",
    "法律だけでなく、ビジネスや経済・経営の仕組みに強く関心がある。",
    "洗練されたオフィスやスピード感のある環境で働きたい。",
    "誰もやったことのないルール作りや前例のないスキーム構築を楽しみたい。",
    "社会全体や国家の正義を預かっているという重圧に耐えたい。",
    "同じ作業の繰り返しよりも、日々変化のあるスリリングな環境を好む。",
    "クライアントとはビジネスパートナーとしてクールに付き合いたい。",
    "お金、数字、M&A、スタートアップといった領域に強く惹かれる。",
    "逆境に立ったとき、「絶対に勝つ」と闘志が湧くタイプだ。",
    "大きな組織の歯車として、社会を正しく動かせたときに達成感を感じる。",
    "仕事における一番の価値は、クライアントが望む未来を自分の手で実現することだ。"
];

let currentQuestion = 0;
let totalScore = 0;

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = questions[currentQuestion];

    let progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function answerQuestion(score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// スコアに応じた4タイプへの分岐ロジック
function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('progress-bar').style.width = `100%`;

    let typeName = "";
    let typeBadge = "";
    let typeDesc = "";

    if (totalScore > 15) {
        typeBadge = "ハイパフォーマンス・挑戦型";
        typeName = "⑤ 国際舞台のタフガイ（渉外・大規模案件志向）";
        typeDesc = "<strong>リアルな働き方：</strong>激務・高給。英語を駆使し、大規模な企業買収や国際仲裁の最前線で活躍するタイプです。<br><br><strong>キャリアのヒント：</strong>若いうちから徹底的な基礎体力をつけるため、5大法律事務所やブティック型の専門事務所をターゲットにしましょう。";
    } else if (totalScore > 5) {
        typeBadge = "ビジネス・戦略追求型";
        typeName = "⑥ 企業防衛の策士（大手事務所・企業法務志向）";
        typeDesc = "<strong>リアルな働き方：</strong>高度な専門スキルと高い年収を両立。企業の法務戦略を根底から支えるプロフェッショナルです。<br><br><strong>キャリアのヒント：</strong>ビジネス感覚と法律の専門性を掛け合わせることで、経営陣から絶大な信頼を得られるキャリアパスが描けます。";
    } else if (totalScore > -5) {
        typeBadge = "バランス・専門追求型";
        typeName = "③ 組織の守護番人（インハウス・組織内弁護士志向）";
        typeDesc = "<strong>リアルな働き方：</strong>安定した経営視点とワークライフバランスの調和。事業会社の内側からビジネスをリードします。<br><br><strong>キャリアのヒント：</strong>長く同じ組織でキャリアを積む先輩法曹の「キャリアの転換点」に注目してみましょう。";
    } else {
        typeBadge = "ワークライフバランス・地域密着型";
        typeName = "⑮ 街の相談役（一般民事・地域密着志向）";
        typeDesc = "<strong>リアルな働き方：</strong>個人の裁量が大きく、依頼者の顔が直接見えるアットホームな環境。ワークライフバランスも良好です。<br><br><strong>キャリアのヒント：</strong>地域に根差した法律事務所の訪問や、個人の悩みに向き合う先輩のリアルなやりがいを直に聞いてみましょう。";
    }

    document.getElementById('result-badge').innerText = typeBadge;
    document.getElementById('result-title').innerText = typeName;
    document.getElementById('result-desc').innerHTML = typeDesc;
}

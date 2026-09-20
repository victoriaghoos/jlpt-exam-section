import type { Exam } from '../types';

// some seed data for the N5 exam.
export const n5Exam1: Exam = {
  id: 'n5-1',
  level: 'N5',
  number: 1,
  sections: [
    {
      id: 'vocab',
      title: { ja: 'もじ・ごい', en: 'Vocabulary' },
      minutes: 20,
      problems: [
        // もんだい 1 Kanji reading (7 questions)
        {
          id: 'mondai-1',
          kind: 'kanji-reading',
          label: 'もんだい 1',
          instruction: {
            ja: '＿＿＿の ことばは ひらがなで どう よみますか。いちばん いい ものを １・２・３・４から ひとつ えらんで ください。',
            en: 'How is the underlined word read? Choose the best answer from 1, 2, 3 and 4.',
          },
          choiceLayout: 'grid',
          questions: [
            {
              id: 1,
              stem: [
                { kind: 'target', value: '北' },
                { kind: 'text', value: 'の そらが くらく なりました。' },
              ],
              translation: 'The northern sky has grown dark.',
              choices: [
                { id: 'a', text: 'きた', why: '北 on its own is きた, north.' },
                { id: 'b', text: 'みなみ', why: 'みなみ is south, written 南.' },
                { id: 'c', text: 'にし', why: 'にし is west, written 西.' },
                { id: 'd', text: 'ひがし', why: 'ひがし is east, written 東.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 2,
              stem: [
                { kind: 'text', value: 'この みせは ' },
                { kind: 'target', value: '午後' },
                { kind: 'text', value: ' ７じまで あいて います。' },
              ],
              translation: 'This shop is open until 7 in the afternoon.',
              choices: [
                { id: 'a', text: 'ごご', why: '午後 is ごご, the afternoon.' },
                { id: 'b', text: 'ごぜん', why: 'ごぜん is the morning, written 午前.' },
                { id: 'c', text: 'こご', why: '午 takes a dakuten here: ご, not こ.' },
                { id: 'd', text: 'ごこ', why: '後 takes a dakuten here: ご, not こ.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 3,
              stem: [
                { kind: 'text', value: 'ケーキを ' },
                { kind: 'target', value: '半分' },
                { kind: 'text', value: ' たべました。' },
              ],
              translation: 'I ate half of the cake.',
              choices: [
                { id: 'a', text: 'はんぷん', why: '分 is ぶん here, with a dakuten, not a handakuten.' },
                { id: 'b', text: 'はんぶん', why: '半分 is はんぶん, half.' },
                { id: 'c', text: 'はんふん', why: '分 needs a dakuten in this word: ぶん, not ふん.' },
                { id: 'd', text: 'はんぶ', why: 'The reading is complete: ぶん, not ぶ.' },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 4,
              stem: [
                { kind: 'text', value: 'まいにち ' },
                { kind: 'target', value: '新聞' },
                { kind: 'text', value: 'を よみます。' },
              ],
              translation: 'I read the newspaper every day.',
              choices: [
                { id: 'a', text: 'しんぶん', why: '新聞 is しんぶん, a newspaper: 新 new and 聞 hear.' },
                { id: 'b', text: 'しんもん', why: '聞 is ぶん in this compound, not もん.' },
                { id: 'c', text: 'しんぷん', why: '聞 takes a dakuten here, not a handakuten: ぶん.' },
                { id: 'd', text: 'にいぶん', why: '新 is しん in compounds. にい appears in 新しい (あたらしい).' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 5,
              stem: [
                { kind: 'text', value: 'あした ' },
                { kind: 'target', value: '友' },
                { kind: 'text', value: 'だちに あいます。' },
              ],
              translation: 'I am meeting a friend tomorrow.',
              choices: [
                { id: 'a', text: 'とも', why: '友だち is ともだち, a friend.' },
                { id: 'b', text: 'ゆう', why: 'ゆう is the on-reading, used in words like 友人 (ゆうじん).' },
                { id: 'c', text: 'どう', why: 'どう is the reading of 道, a different kanji.' },
                { id: 'd', text: 'と', why: 'The reading is とも, two syllables, not one.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 6,
              stem: [
                { kind: 'text', value: 'この ' },
                { kind: 'target', value: '道' },
                { kind: 'text', value: 'は ひろいです。' },
              ],
              translation: 'This road is wide.',
              choices: [
                { id: 'a', text: 'どう', why: 'どう is the on-reading, used in compounds like 道路 (どうろ).' },
                { id: 'b', text: 'みち', why: '道 on its own is みち, a road or path.' },
                { id: 'c', text: 'まち', why: 'まち is a town, written 町.' },
                { id: 'd', text: 'いえ', why: 'いえ is a house, written 家.' },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 7,
              stem: [
                { kind: 'target', value: '電車' },
                { kind: 'text', value: 'で かいしゃへ いきます。' },
              ],
              translation: 'I go to the office by train.',
              choices: [
                { id: 'a', text: 'でんき', why: 'でんき is electricity or a light, written 電気.' },
                { id: 'b', text: 'てんしゃ', why: '電 takes a dakuten: でん, not てん.' },
                { id: 'c', text: 'でんしゃ', why: '電車 is でんしゃ, a train: 電 electric and 車 vehicle.' },
                { id: 'd', text: 'でんち', why: 'でんち is a battery, written 電池.' },
              ],
              correctChoiceId: 'c',
            },
          ],
        },

        // もんだい 2 Spelling (5 questions)
        {
          id: 'mondai-2',
          kind: 'spelling',
          label: 'もんだい 2',
          instruction: {
            ja: '＿＿＿の ことばは どう かきますか。いちばん いい ものを １・２・３・４から ひとつ えらんで ください。',
            en: 'How is the underlined word written? Choose the best answer from 1, 2, 3 and 4.',
          },
          choiceLayout: 'grid',
          questions: [
            {
              id: 8,
              stem: [
                { kind: 'text', value: 'なつやすみに ' },
                { kind: 'target', value: 'やま' },
                { kind: 'text', value: 'に のぼりました。' },
              ],
              translation: 'I climbed a mountain during the summer holiday.',
              choices: [
                { id: 'a', text: '出', why: '出 is で or だ, as in 出る and 出す.' },
                { id: 'b', text: '山', why: '山 is やま, a mountain.' },
                { id: 'c', text: '川', why: '川 is かわ, a river.' },
                { id: 'd', text: '止', why: '止 appears in 止まる (とまる), to stop.' },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 9,
              stem: [
                { kind: 'text', value: 'あたらしい ' },
                { kind: 'target', value: 'くるま' },
                { kind: 'text', value: 'を かいました。' },
              ],
              translation: 'I bought a new car.',
              choices: [
                { id: 'a', text: '車', why: '車 is くるま, a car.' },
                { id: 'b', text: '東', why: '東 is ひがし, east. It looks similar but has an extra stroke.' },
                { id: 'c', text: '軍', why: '軍 means army and is not read くるま.' },
                { id: 'd', text: '事', why: '事 is こと, a thing or matter.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 10,
              stem: [
                { kind: 'text', value: 'まいあさ ' },
                { kind: 'target', value: 'みず' },
                { kind: 'text', value: 'を のみます。' },
              ],
              translation: 'I drink water every morning.',
              choices: [
                { id: 'a', text: '氷', why: '氷 is こおり, ice. It is 水 with one extra stroke.' },
                { id: 'b', text: '永', why: '永 means eternal and is not read みず.' },
                { id: 'c', text: '水', why: '水 is みず, water.' },
                { id: 'd', text: '木', why: '木 is き, a tree.' },
              ],
              correctChoiceId: 'c',
            },
            {
              id: 11,
              stem: [
                { kind: 'text', value: 'わたしの ' },
                { kind: 'target', value: 'ちち' },
                { kind: 'text', value: 'は せんせいです。' },
              ],
              translation: 'My father is a teacher.',
              choices: [
                { id: 'a', text: '母', why: '母 is はは, mother.' },
                { id: 'b', text: '父', why: '父 is ちち, your own father.' },
                { id: 'c', text: '交', why: '交 appears in 交通 (こうつう) and is not read ちち.' },
                { id: 'd', text: '文', why: '文 is ぶん, a sentence.' },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 12,
              stem: [
                { kind: 'text', value: 'きょうは いい ' },
                { kind: 'target', value: 'てんき' },
                { kind: 'text', value: 'です。' },
              ],
              translation: 'The weather is good today.',
              choices: [
                { id: 'a', text: '元気', why: '元気 is げんき, meaning healthy or well.' },
                { id: 'b', text: '天汽', why: '汽 appears in 汽車 (きしゃ) and is not used here.' },
                { id: 'c', text: '天木', why: '木 is き but means tree. It is not the き in てんき.' },
                { id: 'd', text: '天気', why: '天気 is てんき, the weather: 天 sky and 気 air.' },
              ],
              correctChoiceId: 'd',
            },
          ],
        },

        // もんだい 3 Word in context (6 questions)
        {
          id: 'mondai-3',
          kind: 'word-in-context',
          label: 'もんだい 3',
          instruction: {
            ja: '（　　）に なにが はいりますか。いちばん いい ものを １・２・３・４から ひとつ えらんで ください。',
            en: 'What goes in the blank? Choose the best answer from 1, 2, 3 and 4.',
          },
          choiceLayout: 'grid',
          questions: [
            {
              id: 13,
              stem: [
                { kind: 'text', value: 'さむいですから、まどを ' },
                { kind: 'blank' },
                { kind: 'text', value: ' ください。' },
              ],
              translation: 'It is cold, so please close the window.',
              choices: [
                { id: 'a', text: 'あけて', why: 'あける is to open. Opening the window would make it colder.' },
                { id: 'b', text: 'けして', why: 'けす is to switch off, used for lights and machines, not windows.' },
                { id: 'c', text: 'しめて', why: 'しめる is to close, which is what you do to a window when it is cold.' },
                { id: 'd', text: 'はいて', why: 'はく is to wear, used for shoes and trousers.' },
              ],
              correctChoiceId: 'c',
            },
            {
              id: 14,
              stem: [
                { kind: 'text', value: 'くらいですから、でんきを ' },
                { kind: 'blank' },
                { kind: 'text', value: ' ください。' },
              ],
              translation: 'It is dark, so please turn on the light.',
              choices: [
                { id: 'a', text: 'つけて', why: 'つける is to switch on, which is what a dark room needs.' },
                { id: 'b', text: 'けして', why: 'けす is to switch off, the opposite of what is wanted here.' },
                { id: 'c', text: 'あけて', why: 'あける is to open, used for doors and windows, not lights.' },
                { id: 'd', text: 'しめて', why: 'しめる is to close, which does not apply to a light.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 15,
              stem: [
                { kind: 'text', value: 'きっさてんで コーヒーを ' },
                { kind: 'blank' },
                { kind: 'text', value: '。' },
              ],
              translation: 'I drank coffee at the café.',
              choices: [
                { id: 'a', text: 'たべました', why: 'たべる is to eat. Coffee is a drink.' },
                { id: 'b', text: 'のみました', why: 'のむ is to drink, which is what you do with coffee.' },
                { id: 'c', text: 'ききました', why: 'きく is to listen or to ask.' },
                { id: 'd', text: 'みました', why: 'みる is to look or watch.' },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 16,
              stem: [
                { kind: 'text', value: 'この としょかんは とても ' },
                { kind: 'blank' },
                { kind: 'text', value: 'です。' },
              ],
              translation: 'This library is very quiet.',
              choices: [
                { id: 'a', text: 'しずか', why: 'しずか means quiet, which is what a library is.' },
                { id: 'b', text: 'にぎやか', why: 'にぎやか means lively or bustling, the opposite here.' },
                { id: 'c', text: 'ゆうめい', why: 'ゆうめい means famous, which does not fit the sentence.' },
                { id: 'd', text: 'べんり', why: 'べんり means convenient, which says nothing about noise.' },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 17,
              stem: [
                { kind: 'text', value: 'ゆうびんきょくで きってを ' },
                { kind: 'blank' },
                { kind: 'text', value: '。' },
              ],
              translation: 'I bought stamps at the post office.',
              choices: [
                { id: 'a', text: 'いきました', why: 'いく is to go and does not take を with an object like this.' },
                { id: 'b', text: 'のみました', why: 'のむ is to drink, which does not apply to stamps.' },
                { id: 'c', text: 'かいました', why: 'かう is to buy, which is what you do at a post office counter.' },
                { id: 'd', text: 'ありました', why: 'ある means to exist and takes が, not を.' },
              ],
              correctChoiceId: 'c',
            },
            {
              id: 18,
              stem: [
                { kind: 'text', value: 'まいばん じゅうじに ' },
                { kind: 'blank' },
                { kind: 'text', value: '。' },
              ],
              translation: 'I go to bed at ten every night.',
              choices: [
                { id: 'a', text: 'おきます', why: 'おきる is to get up, which does not fit まいばん, every night.' },
                { id: 'b', text: 'ねます', why: 'ねる is to go to sleep, which is what you do at night.' },
                { id: 'c', text: 'たべます', why: 'たべる is to eat and would need an object.' },
                { id: 'd', text: 'あるきます', why: 'あるく is to walk, which does not fit a fixed nightly time.' },
              ],
              correctChoiceId: 'b',
            },
          ],
        },

        // もんだい 4 Same meaning (3 questions)
        {
          id: 'mondai-4',
          kind: 'same-meaning',
          label: 'もんだい 4',
          instruction: {
            ja: '＿＿＿の ぶんと いみが いちばん ちかい ぶんは どれですか。いちばん いい ものを １・２・３・４から ひとつ えらんで ください。',
            en: 'Which sentence is closest in meaning to the underlined one? Choose the best answer from 1, 2, 3 and 4.',
          },
          choiceLayout: 'stack',
          questions: [
            {
              id: 19,
              stem: [{ kind: 'target', value: 'わたしは まいあさ さんぽを します。' }],
              translation: 'I take a walk every morning.',
              choices: [
                {
                  id: 'a',
                  text: 'わたしは あさは いつも さんぽを します。',
                  why: 'まいあさ means every morning, and いつも in the morning says the same thing.',
                },
                {
                  id: 'b',
                  text: 'わたしは あさは ときどき さんぽを します。',
                  why: 'ときどき means sometimes, which is less often than every morning.',
                },
                {
                  id: 'c',
                  text: 'わたしは あさは あまり さんぽを しません。',
                  why: 'あまり…ません means rarely, the opposite of every morning.',
                },
                {
                  id: 'd',
                  text: 'わたしは よるは いつも さんぽを します。',
                  why: 'よる is the evening, not the morning.',
                },
              ],
              correctChoiceId: 'a',
            },
            {
              id: 20,
              stem: [{ kind: 'target', value: 'この みせは やすいです。' }],
              translation: 'This shop is cheap.',
              choices: [
                {
                  id: 'a',
                  text: 'この みせは あたらしいです。',
                  why: 'あたらしい means new, which says nothing about price.',
                },
                {
                  id: 'b',
                  text: 'この みせは ねだんが たかくないです。',
                  why: 'ねだんが たかくない means the prices are not high, which is what やすい means.',
                },
                {
                  id: 'c',
                  text: 'この みせは ちいさいです。',
                  why: 'ちいさい means small, which is about size rather than price.',
                },
                {
                  id: 'd',
                  text: 'この みせは とおいです。',
                  why: 'とおい means far away, which is about distance.',
                },
              ],
              correctChoiceId: 'b',
            },
            {
              id: 21,
              stem: [{ kind: 'target', value: 'ちちは いしゃです。' }],
              translation: 'My father is a doctor.',
              choices: [
                {
                  id: 'a',
                  text: 'ちちは がっこうで はたらいて います。',
                  why: 'A school is where a teacher works, not a doctor.',
                },
                {
                  id: 'b',
                  text: 'ちちは みせで はたらいて います。',
                  why: 'A shop is where a shopkeeper works.',
                },
                {
                  id: 'c',
                  text: 'ちちは びょういんで はたらいて います。',
                  why: 'びょういん is a hospital, which is where a doctor works.',
                },
                {
                  id: 'd',
                  text: 'ちちは うちに います。',
                  why: 'This says he is at home and says nothing about his job.',
                },
              ],
              correctChoiceId: 'c',
            },
          ],
        },
      ],
    },
  ],
};
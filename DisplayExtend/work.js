const menuData = {
    keyword: '東京都町村',
    itemtype: 'nest',
    next: [
        {
            keyword: '御蔵島村',
            itemtype: 'nest',
            next: [
                { keyword: '御蔵島村一円', itemtype: 'select', },
            ]
        },
        {
            keyword: '三宅島三宅村',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '阿古', itemtype: 'select', },
                { keyword: '伊ケ谷', itemtype: 'select', },
                { keyword: '伊豆', itemtype: 'select', },
                { keyword: '神着', itemtype: 'select', },
                { keyword: '坪田', itemtype: 'select', },
                { keyword: '雄山', itemtype: 'select', },
            ]
        },
        {
            keyword: '小笠原村',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '父島', itemtype: 'select', },
                { keyword: '母島', itemtype: 'select', },
            ]
        },
        {
            keyword: '新島村',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '式根島', itemtype: 'select', },
                { keyword: '若郷', itemtype: 'select', },
                { keyword: '本村', itemtype: 'select', },
            ]
        },
        {
            keyword: '神津島村',
            itemtype: 'nest',
            next: [
                { keyword: '神津島村一円', itemtype: 'select', },
            ]
        },
        {
            keyword: '西多摩郡奥多摩町',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '河内', itemtype: 'select', },
                { keyword: '海沢', itemtype: 'select', },
                { keyword: '境', itemtype: 'select', },
                { keyword: '原', itemtype: 'select', },
                { keyword: '小丹波', itemtype: 'select', },
                { keyword: '川井', itemtype: 'select', },
                { keyword: '川野', itemtype: 'select', },
                { keyword: '大丹波', itemtype: 'select', },
                { keyword: '棚沢', itemtype: 'select', },
                { keyword: '丹三郎', itemtype: 'select', },
                { keyword: '日原', itemtype: 'select', },
                { keyword: '梅沢', itemtype: 'select', },
                { keyword: '白丸', itemtype: 'select', },
                { keyword: '氷川', itemtype: 'select', },
                { keyword: '留浦', itemtype: 'select', },
            ]
        },
        {
            keyword: '西多摩郡瑞穂町',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: 'むさし野', itemtype: 'select', },
                { keyword: '駒形富士山', itemtype: 'select', },
                { keyword: '高根', itemtype: 'select', },
                { keyword: '石畑', itemtype: 'select', },
                { keyword: '長岡', itemtype: 'select', },
                { keyword: '長岡下師岡', itemtype: 'select', },
                { keyword: '長岡長谷部', itemtype: 'select', },
                { keyword: '長岡藤橋', itemtype: 'select', },
                { keyword: '殿ケ谷', itemtype: 'select', },
                { keyword: '南平', itemtype: 'select', },
                { keyword: '二本木', itemtype: 'select', },
                { keyword: '箱根ケ崎', itemtype: 'select', },
                { keyword: '箱根ケ崎西松原', itemtype: 'select', },
                { keyword: '箱根ケ崎東松原', itemtype: 'select', },
                { keyword: '富士山栗原新田', itemtype: 'select', },
                { keyword: '武蔵', itemtype: 'select', },
            ]
        },
        {
            keyword: '西多摩郡日の出町',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '大久野', itemtype: 'select', },
                { keyword: '平井', itemtype: 'select', },
            ]
        },
        {
            keyword: '西多摩郡檜原村',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '下元郷', itemtype: 'select', },
                { keyword: '三都郷', itemtype: 'select', },
                { keyword: '小沢', itemtype: 'select', },
                { keyword: '上元郷', itemtype: 'select', },
                { keyword: '神戸', itemtype: 'select', },
                { keyword: '人里', itemtype: 'select', },
                { keyword: '数馬', itemtype: 'select', },
                { keyword: '倉掛', itemtype: 'select', },
                { keyword: '藤原', itemtype: 'select', },
                { keyword: '南郷', itemtype: 'select', },
                { keyword: '樋里', itemtype: 'select', },
                { keyword: '本宿', itemtype: 'select', },
            ]
        },
        {
            keyword: '青ヶ島村',
            itemtype: 'nest',
            next: [
                { keyword: '青ヶ島村一円', itemtype: 'select', },
            ]
        },
        {
            keyword: '大島町',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '岡田', itemtype: 'select', },
                { keyword: '元町', itemtype: 'select', },
                { keyword: '差木地', itemtype: 'select', },
                { keyword: '泉津', itemtype: 'select', },
                { keyword: '波浮港', itemtype: 'select', },
                { keyword: '野増', itemtype: 'select', },
            ]
        },
        {
            keyword: '八丈島八丈町',
            itemtype: 'nest',
            next: [
                { keyword: '下記以外', itemtype: 'select', },
                { keyword: '樫立', itemtype: 'select', },
                { keyword: '三根', itemtype: 'select', },
                { keyword: '大賀郷', itemtype: 'select', },
                { keyword: '中之郷', itemtype: 'select', },
                { keyword: '末吉', itemtype: 'select', },
            ]
        },
        {
            keyword: '利島村',
            itemtype: 'nest',
            next: [
                { keyword: '利島村一円', itemtype: 'select', },
            ]
        },
    ]
};

console.log(menuData);

/*
{
  //level 0
    key: 'keyword',
    description: 'description0',
    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
    nest: [
        {
            key: 'keyword',
            description: 'description1',
            itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
            nest: [
                {
                    key: 'keyword',
                    description: 'description1',
                    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
                },
                {
                    key: 'keyword',
                    description: 'description2',
                    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
                },
            ]
        },
        {
            key: 'keyword',
            description: 'description2',
            itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
        },
    ]
}


Menu description0
    description1
    description2


*/
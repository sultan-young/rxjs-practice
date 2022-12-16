export function createCards(counts: number) {
    let cards = [];
    for (let i = 0; i < counts; i++) {
        const dragon = document.createElement('div');
        const r = Math.floor(Math.random()*255);
        const g = Math.floor(Math.random()*255);
        const b = Math.floor(Math.random()*255);
        const color = 'rgba('+ r +','+ g +','+ b +',0.8)';
        Object.assign(dragon.style, {
            background: color,
            width: '120px',
            height: '200px',
            position: 'absolute',
        })
        dragon.id = 'box' + i;
        cards.push(dragon);
    };
    return cards;
}
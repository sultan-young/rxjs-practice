export function createDragons(counts: number) {
    let dragons = [];
    for (let i = 0; i < counts; i++) {
        const dragon = document.createElement('div');
        const r = Math.floor(Math.random()*255);
        const g = Math.floor(Math.random()*255);
        const b = Math.floor(Math.random()*255);
        const color = 'rgba('+ r +','+ g +','+ b +',0.8)';
        Object.assign(dragon.style, {
            background: color,
            width: '50px',
            height: '50px',
            position: 'absolute',
            'z-index': counts - i,
        })
        dragons.push(dragon);
    };
    return dragons;
}
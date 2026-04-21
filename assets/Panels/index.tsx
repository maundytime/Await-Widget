import {Color, Text, ZStack} from 'await';

// @panel
const text = 'Hello, World!';
// @panel {type:'slider',min:8,max:64,step:1}
const fontSize = 16;
// @panel {type:'menu',items:['monospaced','rounded','serif','default']}
const fontDesign = 'default';
// @panel {type:'color'}
const foreground = 'ccc';
// @panel {type:'color'}
const background = '333';
// @panel
const showBackground = true;

function widget() {
	return (
		<ZStack>
			<Color value={showBackground ? background : ''}/>
			<Text
				value={text}
				fontSize={fontSize}
				fontDesign={fontDesign}
				foreground={foreground}
			/>
		</ZStack>
	);
}

Await.define({
	widget,
});

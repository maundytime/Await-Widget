import {
	Time,
	ZStack,
	Text,
} from 'await';

const time = (new Date()).setSeconds(0, 0);
const T = 2;
const count = 4;
const feature = 'fs02';
const mask = {font: {name: 'Widget', features: feature, size: 400}, sides: 400};

function Mask({phase = 0}: {phase?: number}) {
	return <Time date={new Date(time + phase)} contentTransition='identity' {...mask}/>;
}

function Frame({index}: {index: number}) {
	const phase = (index / count - 1 / 2) * T * 1000;
	return <Text
		value={index + 1}
		maxSides
		background={1}
		mask={index % (count / 2) === 0 ? undefined : <Mask phase={phase}/>}
	/>;
}

export function Gif() {
	const mid = Math.ceil(count / 2);
	const array1 = Array.from({length: mid - 1}, (_, i) => i + 1);
	const array2 = Array.from({length: count - mid}, (_, i) => i + mid);
	return (
		<ZStack contentShape='' disable={true}>
			<Frame index={0}/>
			{array1.map(e => <Frame index={e}/>)}
			<ZStack mask={<Mask/>}>
				{array2.map(e => <Frame index={e}/>)}
			</ZStack>
		</ZStack>
	);
}

function widget() {
	const mid = Math.ceil(count / 2);
	const array1 = Array.from({length: mid - 1}, (_, i) => i + 1);
	const array2 = Array.from({length: count - mid}, (_, i) => i + mid);
	return (
		<ZStack>
			<Frame index={0}/>
			{array1.map(e => <Frame index={e}/>)}
			<ZStack mask={<Mask/>}>
				{array2.map(e => <Frame index={e}/>)}
			</ZStack>
		</ZStack>
	);
}

Await.define({
	widget,
});

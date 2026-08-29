import {ZStack, Image} from 'await';

// @panel {title:'Image URL',title_zh:'图片路径'}
const url = 'sample.jpg';

function widget() {
	return (
		<ZStack>
			<Image url={url} resizable aspectRatio='fill'/>
		</ZStack>
	);
}

Await.define({
	widget,
});

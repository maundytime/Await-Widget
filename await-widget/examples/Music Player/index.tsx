import {
	Button,
	Circle,
	Color,
	FullButton,
	HStack,
	Icon,
	Image,
	Spacer,
	Text,
	VStack,
	ZStack,
} from 'await';

// @panel
const query = '';
// @panel {type:'slider',min:1,max:50,step:1}
const limit = 25;
// @panel {type:'menu',items:['song','album','artist','station','playlist']}
const source = 'station';
// @panel
const showFavorite = false;
// @panel {type:'menu',items:['user','discovery','song','artist']}
const type = 'user';
// @panel
const useTransparent = false;

const artworkSize = 400;
const musicConfig: AwaitMusicPlayConfig = {
	// @ts-expect-error limit is OK
	source, query, type, limit,
};
const outerPadding = 16;
const columnGap = 16;
const widgetRadius = 86 / 3;
const artworkRadius = widgetRadius - outerPadding;
const smallPadding = 10;
const controlSide = 40;

type EntryData = {nowPlaying: AwaitNowPlayingInfo};
type PlayerInfo = ReturnType<typeof getPlayerInfo>;

function widget(entry: WidgetEntry<EntryData>) {
	if (entry.family === 'small') {
		return <SmallWidget entry={entry}/>;
	}

	return <MediumWidget entry={entry}/>;
}

function SmallWidget({entry}: {
	entry: WidgetEntry<EntryData>;
}) {
	const {nowPlaying} = entry;
	const isTrans = useTransparent || entry.renderingMode !== 'fullColor';
	const player = getPlayerInfo(nowPlaying, isTrans);
	const {width, height} = entry.size;
	const side = Math.min(width, height) - smallPadding * 2;

	return (
		<ZStack padding={smallPadding} maxSides background={player.background}>
			<Artwork
				url={nowPlaying.artworkURL}
				side={side}
				background={player.background}
				radius={widgetRadius - smallPadding}
			/>
			<FullButton audio intent={player.isPlaying ? app.command('next') : app.command('toggle', musicConfig)}/>
		</ZStack>
	);
}

function MediumWidget({entry}: {
	entry: WidgetEntry<EntryData>;
}) {
	const {nowPlaying} = entry;
	const {width, height} = entry.size;
	const isTrans = useTransparent || entry.renderingMode !== 'fullColor';
	const player = getPlayerInfo(nowPlaying, isTrans);
	const artworkSide = Math.round(Math.min(height - outerPadding * 2, width * 0.4));
	const contentWidth = width - artworkSide - outerPadding * 2 - columnGap;
	const titleSize = Math.min(28, height * 0.15);

	return (
		<ZStack maxSides background={player.background}>
			<HStack
				maxSides
				spacing={columnGap}
				alignment='center'
				padding={outerPadding}
				buttonStyle='borderless'
			>
				<Artwork
					url={nowPlaying.artworkURL}
					side={artworkSide}
					background={player.background}
					radius={artworkRadius}
				/>
				<VStack frame={{maxWidth: 'max', maxHeight: 'max', alignment: 'leading'}} alignment='leading' spacing={10}>
					<TrackText player={player} titleSize={titleSize} artistSize={12} spacing={6}/>
					<Spacer/>
					<PlayerControls player={player}/>
				</VStack>
			</HStack>
		</ZStack>
	);
}

function getPlayerInfo(nowPlaying: AwaitNowPlayingInfo, isTrans: boolean) {
	const	background: Color = isTrans ? '' : nowPlaying.backgroundColor ?? '9';
	const primary: Color = isTrans ? [1, 1] : nowPlaying.primaryTextColor ?? 1;
	const secondary: Color = isTrans ? [1, 0.75] : nowPlaying.secondaryTextColor ?? primary;
	const tertiary: Color = isTrans ? [1, 0.5] : nowPlaying.tertiaryTextColor ?? secondary;
	return {
		background,
		primary,
		secondary,
		tertiary,
		isPlaying: nowPlaying.state === 'playing',
		isFavorite: nowPlaying.isFavorite,
		title: displayText(nowPlaying.title, 'Song'),
		artist: displayText(nowPlaying.artistName, 'Artist'),
		album: displayText(nowPlaying.albumTitle, 'Album').toUpperCase(),
	};
}

function TrackText({
	player,
	width,
	titleSize,
	artistSize,
	spacing,
}: {
	player: PlayerInfo;
	width?: number;
	titleSize: number;
	artistSize: number;
	spacing: number;
}) {
	const frame = width === undefined ? {} : {width};

	return (
		<VStack {...frame} alignment='leading' spacing={spacing}>
			<Text
				value={player.title}
				foreground={player.primary}
				fontSize={titleSize}
				fontWeight={900}
				lineLimit={2}
				minimumScaleFactor={0.1}
			/>
			<Text
				value={player.artist}
				foreground={player.secondary}
				fontSize={artistSize}
				fontWeight={700}
				lineLimit={1}
				minimumScaleFactor={0.1}
			/>
			<Text
				value={player.album}
				foreground={player.tertiary}
				fontSize={10}
				fontWeight={600}
				lineLimit={2}
				minimumScaleFactor={0.1}
			/>
		</VStack>
	);
}

function PlayerControls({
	player,
}: {
	player: PlayerInfo;
}) {
	const previous = <ControlButton icon='backward.fill' intent={app.command('previous')} foreground={player.primary} background={player.background}/>;
	const toggle = <ControlButton icon={player.isPlaying ? 'pause.fill' : 'play.fill'} intent={app.command('toggle', musicConfig)} foreground={player.primary} background={player.background} primary/>;
	const next = <ControlButton icon='forward.fill' intent={app.command('next')} foreground={player.primary} background={player.background}/>;
	const favorite = <ControlButton icon={player.isFavorite ? 'heart.fill' : 'heart'} intent={app.command(player.isFavorite ? 'clearRating' : 'favorite')} foreground={player.primary} background={player.background}/>;
	const spacer = <Spacer/>;
	const margin = <Spacer width={8}/>;
	return (
		<HStack frame={{maxWidth: 'max', alignment: 'trailing'}}>
			{showFavorite ? [previous, spacer, toggle, spacer, next, spacer, favorite] : [spacer, previous, margin, toggle, margin, next]}
		</HStack>
	);
}

function Artwork({
	url,
	side,
	background,
	radius,
}: {
	url?: string;
	side: number;
	background: Color;
	radius: number;
}) {
	return (
		<ZStack sides={side} cornerRadius={radius} clipped>
			{url === undefined
				? <Color value={[1, 0.15]}/>
				: <Image accented='fullColor' url={url} resizable aspectRatio={[1, 'fill']} sides={side}/>}
		</ZStack>
	);
}

function ControlButton({
	icon,
	intent,
	foreground,
	background,
	primary = false,
}: {
	icon: string;
	intent: IntentInfo;
	foreground: Color;
	background: Color;
	primary?: boolean;
}) {
	return (
		<Button intent={intent} audio>
			<ZStack sides={controlSide} fontWeight={700} fontDesign='rounded' fontSize={14}>
				{primary
					? <Circle
						fill={foreground}
						reverseMask={<Icon
							value={icon}
							foreground={foreground}
						/>}
					/>
					: <Circle
						fill={foreground}
						opacity={0.15}
						overlay={<Icon
							value={icon}
							foreground={foreground}
						/>}
					/>
				}
			</ZStack>
		</Button>
	);
}

async function command(cmd: AwaitMusicPlayerCommand, config?: AwaitMusicPlayConfig) {
	await AwaitMusic.playerCommand(cmd, config);
}

// @panel
async function restart() {
	await AwaitMusic.playerCommand('start', musicConfig);
}

async function widgetTimeline(): Promise<Timeline<EntryData>> {
	const nowPlaying = await AwaitMusic.nowPlaying({artworkSize});

	return {
		entries: [{date: new Date(), nowPlaying}],
	};
}

const displayText = (value: string | undefined, fallback: string) => (value ?? fallback).trim().replaceAll(/\s+/g, ' ');

const app = Await.define({
	widget,
	widgetTimeline,
	widgetIntents: {
		command, restart,
	},
	widgetFamilies: ['small', 'medium'],
	autoAccented: false,
});

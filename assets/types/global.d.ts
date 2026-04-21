type Encodable =
  | string
  | number
  | boolean
  | undefined
  | Encodable[]
  | { [key: string]: Encodable };
type AudioOption = "mix" | "duckOthers" | "solo";
type ColorScheme = "light" | "dark";
type RenderingMode = "fullColor" | "accented" | "vibrant";
type TemplateRenderingMode = "original" | "template";
type Update = Date | "end" | "never";
type WidgetFamily =
  | "small"
  | "medium"
  | "large"
  | "extraLarge"
  | "extraLargePortrait"
  | "accessoryInline"
  | "accessoryCircular"
  | "accessoryRectangular"
  | "unknown";
type Size = { width: number; height: number };

type SingleNativeView =
  | {
      kind: string;
      flat?: unknown[];
      children?: NativeView;
    }
  | string
  | number
  | undefined;
type NativeView = SingleNativeView | NativeView[];

type IntentInfo = {
  name: string;
  args: Encodable[];
};

type AudioConfig = {
  soundFont?: string;
  volume?: number;
  duration?: number;
  delay?: number;
  velocity?: number;
  preset?: number;
  bank?: number;
  loop?: boolean;
  audioOption?: AudioOption;
};

type SoundFontManualMapping = {
  path: string;
  key: number;
};

type SoundFontBuildConfig = {
  savePath: string;
  dataSizeLimitMB?: number;
  mediaFiles?: string[];
  mappings?: SoundFontManualMapping[];
};

type SoundFontCompressConfig = {
  fromPath: string;
  savePath: string;
  dataSizeLimitMB?: number;
};

type SoundFontBuildResult = {
  ok: true;
  output: string;
  resolvedOutput: string;
  sizeBytes: number;
};

type AwaitWeatherConfig = {
  latitude?: number;
  longitude?: number;
  hourlyLimit?: number;
  dailyLimit?: number;
};

type AwaitWeatherCurrent = {
  date: string;
  condition: string;
  symbolName: string;
  temperatureCelsius: number;
  apparentTemperatureCelsius: number;
  humidity: number;
  uvIndex: number;
  windSpeedMetersPerSecond: number;
  windDirectionDegrees: number;
  pressureHectopascals: number;
  visibilityKilometers: number;
};

type AwaitWeatherHourly = {
  date: string;
  condition: string;
  symbolName: string;
  temperatureCelsius: number;
  humidity: number;
  uvIndex: number;
  windSpeedMetersPerSecond: number;
  precipitationChance: number;
};

type AwaitWeatherDaily = {
  date: string;
  condition: string;
  symbolName: string;
  highTemperatureCelsius: number;
  lowTemperatureCelsius: number;
  precipitationChance: number;
  uvIndex: number;
};

type AwaitWeatherResult = {
  location: { latitude: number; longitude: number };
  current: AwaitWeatherCurrent;
  hourly: AwaitWeatherHourly[];
  daily: AwaitWeatherDaily[];
};

type AwaitHealthInfo = {
  stepCount?: number;
  distanceWalkingRunning?: number;
  flightsClimbed?: number;
};

type AwaitLocationConfig = {
  desiredAccuracyMeters?: number;
  timeoutSeconds?: number;
};

type AwaitLocationInfo = {
  latitude: number;
  longitude: number;
  date: Date;
  altitudeMeters?: number;
  speedMetersPerSecond?: number;
  courseDegrees?: number;
};

type AwaitNowPlayingConfig = {
  artworkSize?: number;
};

type AwaitNowPlayingInfo = {
  state?:
    | "playing"
    | "paused"
    | "stopped"
    | "interrupted"
    | "seekingForward"
    | "seekingBackward";
  sourceConfig?: AwaitMediaPlayConfig;
  id?: string;
  title?: string;
  artistName?: string;
  albumTitle?: string;
  artworkURL?: string;
  maximumWidth?: number;
  maximumHeight?: number;
  backgroundColor?: Color;
  primaryTextColor?: Color;
  secondaryTextColor?: Color;
  tertiaryTextColor?: Color;
  quaternaryTextColor?: Color;
};

type AwaitMusicPlayerCommand = "start" | "toggle" | "next" | "previous";

type AwaitMediaPlayConfig =
  | {
      source: "song";
      id?: string;
      query?: string;
      limit?: number;
      shuffle?: boolean;
      loop?: boolean;
      offset?: number;
    }
  | {
      source: "album";
      id?: string;
      query?: string;
      shuffle?: boolean;
      loop?: boolean;
    }
  | {
      source: "station";
      query?: string;
      type?: "discovery" | "user";
      id?: string;
    };

type AwaitCalendarConfig = {
  start?: Date;
  end?: Date;
  limit?: number;
};

type AwaitCalendarItem = {
  calendarTitle: string;
  title: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  location?: string;
  notes?: string;
  url?: string;
};

type AwaitReminderConfig = {
  type?: "all" | "incomplete" | "completed";
  limit?: number;
};

type AwaitReminderItem = {
  calendarTitle: string;
  title: string;
  notes?: string;
  isCompleted: boolean;
  priority: number;
  startDate?: Date;
  dueDate?: Date;
  completionDate?: Date;
};

type AwaitSystemInfo = {
  battery: {
    state: "charging" | "full" | "unplugged" | "unknown";
    percent: number;
    lowPowerMode: boolean;
  };
  memory?: {
    used: number;
    free: number;
    total: number;
    percent: number;
  };
  cpu: {
    percent?: number;
  };
  storage?: {
    total: number;
    free: number;
    used: number;
    percent: number;
  };
};

type AwaitAlarmScheduleConfig = {
  title?: string;
  duration?: number;
  date?: Date;
  tint?: Color;
};

type WidgetEntry<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    colorScheme: ColorScheme;
    renderingMode: RenderingMode;
    size: Size;
    family: WidgetFamily;
  } & {
    date: Date;
  } & T;

type TimelineContext = {
  size: Size;
  family: WidgetFamily;
};

type Timeline<T extends Record<string, unknown> = Record<string, unknown>> = {
  entries: Array<{ date: Date } & T>;
  update?: Update;
};

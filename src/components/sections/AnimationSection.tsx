import { useTranslation } from 'react-i18next';
import { HelpLink } from '@/components/ui/help-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { HighlightedLabel } from '@/lib/search-context';
import { useQRStore } from '@/store/qr-store';

export function AnimationSection() {
  const {
    tier,
    animation,
    setAnimationSpeedMs,
    setAnimationLoop,
    setAnimationBounce,
    setAnimationStartFrame,
    setAnimationMaxFrames,
    setAnimationFrameStep,
  } = useQRStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Speed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between"><Label className="flex items-center gap-1.5">
              <HighlightedLabel>{t('animation.speed')}</HighlightedLabel>
              <HelpLink href="/guide#section-15" requiredTier="advanced" title={t('common.learnMore')} />
            </Label>
          <span className="text-sm text-muted-foreground">
            {t('qr.nMs', { count: animation.speedMs })}
          </span>
        </div>
        <Slider
          value={[animation.speedMs]}
          onValueChange={([v]) => setAnimationSpeedMs(v)}
          min={20}
          max={500}
          step={10}
        />
      </div>

      {/* Loop */}
      <div className="flex items-center justify-between">
        <Label>
          <HighlightedLabel>{t('animation.loop')}</HighlightedLabel>
        </Label>
        <Switch
          checked={animation.loop}
          onCheckedChange={setAnimationLoop}
          title={t('hints.loopAnimation')}
        />
      </div>

      {/* Bounce / Ping-Pong */}
      <div className="flex items-center justify-between">
        <Label>
          <HighlightedLabel>{t('animation.bounce')}</HighlightedLabel>
        </Label>
        <Switch
          checked={animation.bounce}
          onCheckedChange={setAnimationBounce}
          title={t('hints.bounceAnimation')}
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Start Frame */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                <HighlightedLabel>{t('animation.startFrame')}</HighlightedLabel>
              </Label>
              <span className="text-sm text-muted-foreground">{animation.startFrame}</span>
            </div>
            <Slider
              value={[animation.startFrame]}
              onValueChange={([v]) => setAnimationStartFrame(v)}
              min={0}
              max={100}
              step={1}
            />
          </div>

          {/* Max Frames */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                <HighlightedLabel>{t('animation.maxFrames')}</HighlightedLabel>
              </Label>
              <span className="text-sm text-muted-foreground">
                {animation.maxFrames === 0
                  ? t('animation.auto', { defaultValue: 'Auto' })
                  : animation.maxFrames}
              </span>
            </div>
            <Slider
              value={[animation.maxFrames]}
              onValueChange={([v]) => setAnimationMaxFrames(v)}
              min={0}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              {t('hints.maxFramesAuto', {
                defaultValue: '0 = Auto (uses source frames, max 50 for performance)',
              })}
            </p>
          </div>

          {/* Frame Step */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                <HighlightedLabel>{t('animation.frameStep')}</HighlightedLabel>
              </Label>
              <span className="text-sm text-muted-foreground">
                {t('animation.everyNFrames', { count: animation.frameStep })}
              </span>
            </div>
            <Slider
              value={[animation.frameStep]}
              onValueChange={([v]) => setAnimationFrameStep(v)}
              min={1}
              max={10}
              step={1}
            />
          </div>

          {/* Interpolation */}
          <div className="space-y-2">
            <Label>
              <HighlightedLabel>{t('animation.interpolation')}</HighlightedLabel>
            </Label>
            <Select
              value={animation.interpolate}
              onValueChange={(v) =>
                useQRStore.setState((s) => ({
                  animation: { ...s.animation, interpolate: v as typeof animation.interpolate },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('animation.none')}</SelectItem>
                <SelectItem value="crossfade">{t('animation.crossfade')}</SelectItem>
                <SelectItem value="morph">{t('animation.morph')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Temporal Dither */}
          <div className="space-y-2 pt-2 border-t">
            <Label>
              <HighlightedLabel>{t('animation.temporalDither')}</HighlightedLabel>
            </Label>
            <Select
              value={animation.temporalDither}
              onValueChange={(v) =>
                useQRStore.setState((s) => ({
                  animation: {
                    ...s.animation,
                    temporalDither: v as typeof animation.temporalDither,
                  },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">{t('animation.off')}</SelectItem>
                <SelectItem value="blue_noise">{t('animation.blueNoise')}</SelectItem>
                <SelectItem value="flicker_safe">{t('animation.flickerSafe')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Animation Pattern */}
          <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <HighlightedLabel>{t('animation.pattern')}</HighlightedLabel>
            <HelpLink href="/guide#section-48" requiredTier="professional" title={t('common.learnMore')} />
          </Label>
            <Select
              value={animation.pattern}
              onValueChange={(v) =>
                useQRStore.setState((s) => ({
                  animation: { ...s.animation, pattern: v as typeof animation.pattern },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('animation.none')}</SelectItem>
                <SelectItem value="pulse">{t('animation.pulse')}</SelectItem>
                <SelectItem value="wave">{t('animation.wave')}</SelectItem>
                <SelectItem value="scanline">{t('animation.scanline')}</SelectItem>
                <SelectItem value="shimmer">{t('animation.shimmer')}</SelectItem>
                <SelectItem value="drift">{t('animation.drift')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Module Jitter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                <HighlightedLabel>{t('animation.moduleJitter')}</HighlightedLabel>
              </Label>
              <span className="text-sm text-muted-foreground">
                {t('qr.nPx', { count: animation.moduleJitterPx })}
              </span>
            </div>
            <Slider
              value={[animation.moduleJitterPx]}
              onValueChange={([v]) =>
                useQRStore.setState((s) => ({ animation: { ...s.animation, moduleJitterPx: v } }))
              }
              min={0}
              max={5}
              step={0.5}
            />
            <p className="text-xs text-muted-foreground">{t('hints.moduleJitterWarning')}</p>
          </div>

          {/* Color Cycle */}
          <div className="flex items-center justify-between">
            <Label>
              <HighlightedLabel>{t('animation.colorCycle')}</HighlightedLabel>
            </Label>
            <Switch
              checked={animation.colorCycle}
              onCheckedChange={(checked) =>
                useQRStore.setState((s) => ({ animation: { ...s.animation, colorCycle: checked } }))
              }
            />
          </div>

          {/* Seed */}
          <div className="space-y-2">
            <Label>
              <HighlightedLabel>{t('animation.randomSeed')}</HighlightedLabel>
            </Label>
            <Input
              type="number"
              value={animation.seed}
              onChange={(e) =>
                useQRStore.setState((s) => ({
                  animation: { ...s.animation, seed: parseInt(e.target.value, 10) || 0 },
                }))
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

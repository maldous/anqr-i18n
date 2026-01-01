import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { calculateOptimalVersion } from '@/modules/qr-core';
import { type ECCLevel, type EncodingMode, useQRStore } from '@/store/qr-store';

export function QREncodingSection() {
  const {
    tier,
    qr,
    setQrVersion,
    setQrEcc,
    setQrEncodingMode,
    setQrQuietZone,
    setQrQuietZoneMinEnforce,
    getPayloadText,
  } = useQRStore();
  const { t } = useTranslation();

  // Calculate minimum required version for current content
  const minRequiredVersion = useMemo(() => {
    const content = getPayloadText();
    if (!content) return 1;
    return calculateOptimalVersion(content, qr.ecc);
  }, [getPayloadText, qr.ecc]);

  // Handle version change - ensure it doesn't go below minimum (unless 0 = auto)
  const handleVersionChange = (value: number) => {
    if (value === 0) {
      // Auto mode is always allowed
      setQrVersion(0);
    } else if (value < minRequiredVersion) {
      // Jump to minimum required version
      setQrVersion(minRequiredVersion);
    } else {
      setQrVersion(value);
    }
  };

  return (
    <div className="space-y-4">
      {/* Version */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>
            <HighlightedLabel>{t('qr.version')}</HighlightedLabel>
          </Label>
          <span className="text-sm text-muted-foreground">
            {qr.version === 0 ? t('qr.autoMin', { version: minRequiredVersion }) : qr.version}
          </span>
        </div>
        <Slider
          value={[qr.version]}
          onValueChange={([v]) => handleVersionChange(v)}
          min={0}
          max={40}
          step={1}
          title={t('hints.qrVersion')}
        />
        <p className="text-xs text-muted-foreground">
          {qr.version === 0
            ? t('hints.autoDetect', { version: minRequiredVersion })
            : qr.version < minRequiredVersion
              ? t('hints.versionTooLow', { version: minRequiredVersion })
              : t('hints.autoMinVersion', { version: minRequiredVersion })}
        </p>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('qr.errorCorrection')}</HighlightedLabel>
        </Label>
        <Select value={qr.ecc} onValueChange={(v) => setQrEcc(v as ECCLevel)}>
          <SelectTrigger title={t('hints.errorCorrection')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">{t('qr.low')}</SelectItem>
            <SelectItem value="M">{t('qr.medium')}</SelectItem>
            <SelectItem value="Q">{t('qr.quartile')}</SelectItem>
            <SelectItem value="H">{t('qr.high')}</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">{t('hints.higherEccLargerQr')}</p>
      </div>

      {/* Quiet Zone / Margin */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>
            <HighlightedLabel>{t('qr.margin')}</HighlightedLabel>
          </Label>
          <span className="text-sm text-muted-foreground">
            {t('qr.nModules', { count: qr.quietZoneModules })}
          </span>
        </div>
        <Slider
          value={[qr.quietZoneModules]}
          onValueChange={([v]) => setQrQuietZone(v)}
          min={0}
          max={10}
          step={1}
          title={t('hints.quietZone')}
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Encoding Mode */}
          <div className="space-y-2">
            <Label>
              <HighlightedLabel>{t('qr.encodingMode')}</HighlightedLabel>
            </Label>
            <Select
              value={qr.encodingMode}
              onValueChange={(v) => setQrEncodingMode(v as EncodingMode)}
            >
              <SelectTrigger title={t('hints.encodingMode')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{t('qr.autoOptimal')}</SelectItem>
                <SelectItem value="numeric">{t('qr.numericOnly')}</SelectItem>
                <SelectItem value="alphanumeric">{t('qr.alphanumeric')}</SelectItem>
                <SelectItem value="byte">{t('qr.byteUtf8')}</SelectItem>
                <SelectItem value="kanji">{t('qr.kanji')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Quiet Zone Enforce */}
          <div className="flex items-center justify-between">
            <div>
              <Label>
                <HighlightedLabel>{t('qr.enforceMinQuietZone')}</HighlightedLabel>
              </Label>
              <p className="text-xs text-muted-foreground">{t('qr.enforceMinQuietZoneDesc')}</p>
            </div>
            <Switch
              checked={qr.quietZoneMinEnforce}
              onCheckedChange={setQrQuietZoneMinEnforce}
              title={t('hints.enforceMinQuietZone')}
            />
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Border Modules Extra */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label>{t('qr.extraBorderModules')}</Label>
              <span className="text-sm text-muted-foreground">{qr.borderModulesExtra}</span>
            </div>
            <Slider
              value={[qr.borderModulesExtra]}
              onValueChange={([v]) =>
                useQRStore.setState((s) => ({ qr: { ...s.qr, borderModulesExtra: v } }))
              }
              min={0}
              max={10}
              step={1}
              title={t('hints.extraBorder')}
            />
            <p className="text-xs text-muted-foreground">{t('qr.additionalBorder')}</p>
          </div>
        </>
      )}
    </div>
  );
}

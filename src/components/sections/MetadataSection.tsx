import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { HighlightedLabel } from '@/lib/search-context';
import { useQRStore } from '@/store/qr-store';

export function MetadataSection() {
  const { metadata, setMetadata } = useQRStore();
  const { t } = useTranslation();

  const addCustomKv = () => {
    setMetadata({ customKv: [...metadata.customKv, { k: '', v: '' }] });
  };

  const updateCustomKv = (index: number, field: 'k' | 'v', value: string) => {
    const newKv = [...metadata.customKv];
    newKv[index] = { ...newKv[index], [field]: value };
    setMetadata({ customKv: newKv });
  };

  const removeCustomKv = (index: number) => {
    setMetadata({ customKv: metadata.customKv.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('metadata.title')}</HighlightedLabel>
        </Label>
        <Input
          value={metadata.title}
          onChange={(e) => setMetadata({ title: e.target.value })}
          placeholder={t('metadata.titlePlaceholder')}
        />
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('metadata.author')}</HighlightedLabel>
        </Label>
        <Input
          value={metadata.author}
          onChange={(e) => setMetadata({ author: e.target.value })}
          placeholder={t('metadata.authorPlaceholder')}
        />
      </div>

      {/* Copyright */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('metadata.copyright')}</HighlightedLabel>
        </Label>
        <Input
          value={metadata.copyright}
          onChange={(e) => setMetadata({ copyright: e.target.value })}
          placeholder={t('metadata.copyrightPlaceholder')}
        />
      </div>

      {/* License */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('metadata.license')}</HighlightedLabel>
        </Label>
        <Input
          value={metadata.license}
          onChange={(e) => setMetadata({ license: e.target.value })}
          placeholder={t('metadata.licensePlaceholder')}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>
          <HighlightedLabel>{t('metadata.description')}</HighlightedLabel>
        </Label>
        <Textarea
          value={metadata.description}
          onChange={(e) => setMetadata({ description: e.target.value })}
          placeholder={t('metadata.descriptionPlaceholder')}
          rows={3}
        />
      </div>

      {/* Creation Time */}
      <div className="flex items-center justify-between">
        <Label>
          <HighlightedLabel>{t('metadata.includeCreationTime')}</HighlightedLabel>
        </Label>
        <Switch
          checked={metadata.creationTime}
          onCheckedChange={(checked) => setMetadata({ creationTime: checked })}
        />
      </div>

      {/* Custom Key-Value Pairs */}
      <div className="space-y-2 pt-2 border-t">
        <Label className="text-muted-foreground">
          <HighlightedLabel>{t('metadata.customMetadata')}</HighlightedLabel>
        </Label>
        {metadata.customKv.map((kv, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={kv.k}
              onChange={(e) => updateCustomKv(index, 'k', e.target.value)}
              placeholder={t('metadata.key')}
              className="flex-1"
            />
            <Input
              value={kv.v}
              onChange={(e) => updateCustomKv(index, 'v', e.target.value)}
              placeholder={t('metadata.value')}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => removeCustomKv(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addCustomKv} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> {t('metadata.addCustomField')}
        </Button>
      </div>
    </div>
  );
}

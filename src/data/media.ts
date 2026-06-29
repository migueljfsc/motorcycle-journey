// Trip photo keys in R2, grouped by trip slug (shared across EN/PT).
// Generated from the motorcycle-journey-media bucket. Change MEDIA_BASE if the
// public host changes (e.g. moving off r2.dev onto a custom domain).

export const MEDIA_BASE = "https://pub-e11227dc8e95460a9f306e7e75c16db4.r2.dev";

// Vertical focal point (object-position) for each trip's card thumbnail. Most
// trip covers are portrait shots with the bike low in the frame, so a centred
// 2:1 crop would clip it — these nudge the crop down onto the subject. Trips
// not listed fall back to "center" (fine for landscape covers).
export const coverPosition: Record<string, string> = {
  "rio-ave": "50% 68%",
  "pedorido-river-beach": "50% 62%",
  "ofir": "50% 70%",
  "cavado-perelhal": "50% 62%",
  "entre-os-rios": "50% 68%",
  "sao-bartolomeu-dj": "50% 60%",
  "terra-nova-mindelo": "50% 72%",
  "melres-sofia": "50% 62%",
};

// Focal point (object-position) per individual photo for the detail-page
// carousel's fixed 3:2 frame. Landscape (native 3:2) shots fill it exactly, so
// they're omitted and default to "center"; portraits are cropped top/bottom and
// get a vertical nudge onto the bike/subject. Keyed by the R2 object key.
export const photoPosition: Record<string, string> = {
  // Honda CL500 (bike gallery)
  "bikes/2023-honda-cl500/1_2F5DBBF5-67E2-4C20-9893-2D6EC123F31B-35756-000008B4B3D6C80E.jpeg": "50% 70%",
  "bikes/2023-honda-cl500/1_E252468E-A79F-4E3B-917E-ADFD6786E315-50451-00001E51C346284E.jpg": "50% 65%",
  "bikes/2023-honda-cl500/2_0417D99B-DD10-4336-B0FD-A71C8C18A117-39090-0000079A0B20C74F.JPG": "50% 58%",
  "bikes/2023-honda-cl500/2_CC4DAF69-5CEF-449D-93E0-A1EB6ACB739F-6276-000000D2C9131009.JPG": "50% 60%",
  // douro-cu-grande
  "trips/20240606-douro-cu-grande/2_E1459C67-D96C-44D4-9FEC-A539AD7700FC-31778-000004E9EF98CC42 Edited.JPG": "50% 80%",
  "trips/20240606-douro-cu-grande/3_9433FA09-EA43-4E48-9AC1-F4FADEA13E26-39090-0000079AC68C9F36.JPG": "50% 80%",
  // rio-ave
  "trips/20240716-rio-ave/1_53F5ED44-6673-454A-8513-573683F05CCB-39090-0000079A4E91DC4E.JPG": "50% 80%",
  "trips/20240716-rio-ave/2_0417D99B-DD10-4336-B0FD-A71C8C18A117-39090-0000079A0B20C74F.JPG": "50% 58%",
  "trips/20240716-rio-ave/4_CB58A64E-FBD2-4E2B-8FF7-289DAF509BA8-39090-00000799E04A80A4.JPG": "50% 65%",
  // pedorido-river-beach
  "trips/20240723-pedorido-river-beach/1_A71FC47A-AAB1-4785-BD06-59016B5BA7F9-80399-00000E2A248EF7AF.JPG": "50% 62%",
  "trips/20240723-pedorido-river-beach/3_566D5E26-526C-469A-8796-BED2C4721E92-80399-00000E29C878567F.JPG": "50% 80%",
  // ofir
  "trips/20240806-ofir/1_D815A0B2-00AC-4BD3-8E54-ABB4E2D2FA05-52364-000018CF5517BF95.JPG": "50% 70%",
  "trips/20240806-ofir/2_B2CE24B4-4A95-453D-91D2-D33A2B8A291A-52364-000018CFD0B98414.JPG": "50% 80%",
  "trips/20240806-ofir/4_E1D0CD1F-67F7-4F38-AD9A-A03D07A443BF-52364-000018CF3E24C292.JPG": "50% 85%",
  // cavado-perelhal
  "trips/20250619-cavado-perelhal/1_0D620199-6D7A-47EE-A116-954BDCB6B07C-6484-000000D6AA54C286.JPG": "50% 62%",
  "trips/20250619-cavado-perelhal/2_CC4DAF69-5CEF-449D-93E0-A1EB6ACB739F-6276-000000D2C9131009.JPG": "50% 60%",
  "trips/20250619-cavado-perelhal/3_A8AD7100-BA36-455C-BC7D-387BB36CF828-6484-000000D6DB77E5D5.JPG": "50% 60%",
  "trips/20250619-cavado-perelhal/4_66E86498-5B51-4881-8531-2893C919323B-6276-000000D2AFE5B48F.JPG": "50% 60%",
  "trips/20250619-cavado-perelhal/5_FE668705-D7D1-4068-BAA1-0348C2B59976-6276-000000D2A6DA28D6.JPG": "50% 65%",
  // entre-os-rios
  "trips/20250722-entre-os-rios/1_E252468E-A79F-4E3B-917E-ADFD6786E315-50451-00001E51C346284E.jpg": "50% 85%",
  "trips/20250722-entre-os-rios/2_8FB4CC2B-477B-4611-9DFD-E489713B3052-50451-00001E51EC30C26A.JPG": "50% 58%",
  // sao-bartolomeu-dj
  "trips/20250809-sao-bartolomeu-dj/1_26D311B2-F9CC-422F-9BFF-B7445B9DA8DA-72353-00002D7C9FA0E9B6.JPG": "50% 60%",
  "trips/20250809-sao-bartolomeu-dj/2_65B2FB6E-B03E-43C2-9FCB-4781AD3CE4A0-72353-00002D7CAACBB263.JPG": "50% 62%",
  "trips/20250809-sao-bartolomeu-dj/3_D522CABB-457C-48CC-A9EF-813E31273750-72353-00002D7CA302B4B8.JPG": "50% 60%",
  "trips/20250809-sao-bartolomeu-dj/4_ECDC531F-DD6C-432E-8949-378D142CD9E2-72353-00002D7DBA9AFC66.JPG": "50% 55%",
  // terra-nova-mindelo
  "trips/20260401-terra-nova-mindelo/2_0193D2CD-CFA8-4A77-91F6-2CBC562553E3-35756-000008B4D4716165.jpg": "50% 80%",
  "trips/20260401-terra-nova-mindelo/3_3E4A85D4-424F-44E6-820C-001C930968EE-35756-000008B4EED850E9.jpg": "50% 62%",
  // melres-sofia
  "trips/20260607-melres-sofia/1_IMG_7197.JPG": "50% 62%",
};

export const tripPhotos: Record<string, string[]> = {
  "douro-cu-grande": [
    "trips/20240606-douro-cu-grande/1_F56BADC8-A9E4-4AC0-9307-2CDA8EFC5054-31778-000004EA0BE04373.JPG",
    "trips/20240606-douro-cu-grande/2_E1459C67-D96C-44D4-9FEC-A539AD7700FC-31778-000004E9EF98CC42 Edited.JPG",
    "trips/20240606-douro-cu-grande/3_9433FA09-EA43-4E48-9AC1-F4FADEA13E26-39090-0000079AC68C9F36.JPG",
  ],
  "rio-ave": [
    "trips/20240716-rio-ave/1_53F5ED44-6673-454A-8513-573683F05CCB-39090-0000079A4E91DC4E.JPG",
    "trips/20240716-rio-ave/2_0417D99B-DD10-4336-B0FD-A71C8C18A117-39090-0000079A0B20C74F.JPG",
    "trips/20240716-rio-ave/3_1FAB477E-29CC-45EC-9567-E0E5297B75BD-39090-00000799D3EA4F1E.JPG",
    "trips/20240716-rio-ave/4_CB58A64E-FBD2-4E2B-8FF7-289DAF509BA8-39090-00000799E04A80A4.JPG",
  ],
  "pedorido-river-beach": [
    "trips/20240723-pedorido-river-beach/1_A71FC47A-AAB1-4785-BD06-59016B5BA7F9-80399-00000E2A248EF7AF.JPG",
    "trips/20240723-pedorido-river-beach/2_C81DB235-8EAB-407A-B306-59BBF94ABCD5-80399-00000E29E12CE985.JPG",
    "trips/20240723-pedorido-river-beach/3_566D5E26-526C-469A-8796-BED2C4721E92-80399-00000E29C878567F.JPG",
  ],
  "ofir": [
    "trips/20240806-ofir/1_D815A0B2-00AC-4BD3-8E54-ABB4E2D2FA05-52364-000018CF5517BF95.JPG",
    "trips/20240806-ofir/2_B2CE24B4-4A95-453D-91D2-D33A2B8A291A-52364-000018CFD0B98414.JPG",
    "trips/20240806-ofir/3_A65E83B8-309F-4B09-A4F8-0E71C3C3ECD8-52364-000018CEF5585BF5.JPG",
    "trips/20240806-ofir/4_E1D0CD1F-67F7-4F38-AD9A-A03D07A443BF-52364-000018CF3E24C292.JPG",
  ],
  "cavado-perelhal": [
    "trips/20250619-cavado-perelhal/1_0D620199-6D7A-47EE-A116-954BDCB6B07C-6484-000000D6AA54C286.JPG",
    "trips/20250619-cavado-perelhal/2_CC4DAF69-5CEF-449D-93E0-A1EB6ACB739F-6276-000000D2C9131009.JPG",
    "trips/20250619-cavado-perelhal/3_A8AD7100-BA36-455C-BC7D-387BB36CF828-6484-000000D6DB77E5D5.JPG",
    "trips/20250619-cavado-perelhal/4_66E86498-5B51-4881-8531-2893C919323B-6276-000000D2AFE5B48F.JPG",
    "trips/20250619-cavado-perelhal/5_FE668705-D7D1-4068-BAA1-0348C2B59976-6276-000000D2A6DA28D6.JPG",
  ],
  "entre-os-rios": [
    "trips/20250722-entre-os-rios/1_E252468E-A79F-4E3B-917E-ADFD6786E315-50451-00001E51C346284E.jpg",
    "trips/20250722-entre-os-rios/2_8FB4CC2B-477B-4611-9DFD-E489713B3052-50451-00001E51EC30C26A.JPG",
  ],
  "sao-bartolomeu-dj": [
    "trips/20250809-sao-bartolomeu-dj/1_26D311B2-F9CC-422F-9BFF-B7445B9DA8DA-72353-00002D7C9FA0E9B6.JPG",
    "trips/20250809-sao-bartolomeu-dj/2_65B2FB6E-B03E-43C2-9FCB-4781AD3CE4A0-72353-00002D7CAACBB263.JPG",
    "trips/20250809-sao-bartolomeu-dj/3_D522CABB-457C-48CC-A9EF-813E31273750-72353-00002D7CA302B4B8.JPG",
    "trips/20250809-sao-bartolomeu-dj/4_ECDC531F-DD6C-432E-8949-378D142CD9E2-72353-00002D7DBA9AFC66.JPG",
  ],
  "terra-nova-mindelo": [
    "trips/20260401-terra-nova-mindelo/2_0193D2CD-CFA8-4A77-91F6-2CBC562553E3-35756-000008B4D4716165.jpg",
    "trips/20260401-terra-nova-mindelo/3_3E4A85D4-424F-44E6-820C-001C930968EE-35756-000008B4EED850E9.jpg",
  ],
  "melres-sofia": [
    "trips/20260607-melres-sofia/1_IMG_7197.JPG",
  ],
};

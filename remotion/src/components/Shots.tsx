import React from "react";
import { interpolate } from "remotion";
import {
  BigNumber,
  Card,
  CheckRow,
  INK,
  Pill,
  StatBox,
} from "./Primitives";

// `progress` = 0..1 a través de la duración del shot, para animar
// checkmarks, resaltados, etc.

export const TestLog: React.FC<{ progress: number }> = ({ progress }) => {
  const n = Math.ceil(progress * 3);
  return (
    <Card style={{ width: 520 }}>
      <Pill bg="#fff" color={INK} style={{ marginBottom: 14 }}>
        Registro de pruebas · 3 tipos
      </Pill>
      <CheckRow label="Anuncios divertidos" checked={n >= 1} />
      <CheckRow label="Anuncios educativos" checked={n >= 2} />
      <CheckRow label="Anuncios de oferta" checked={n >= 3} />
      <div style={{ textAlign: "center", marginTop: 8, fontFamily: "Inter", fontWeight: 700, color: "#777" }}>
        estado: probé de todo
      </div>
    </Card>
  );
};

export const StatFunny: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 460 }}>
    <Pill bg="#FF4FA3">Anuncios divertidos</Pill>
    <div style={{ marginTop: 16 }}>
      <StatBox label="VISTAS" value="SÍ" />
      <StatBox label="DEMOS" value="0" />
    </div>
    <BigNumber value={0} sub="Agendas desde estos anuncios" />
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <Pill bg="#F5C242" color={INK}>
        Nadie agendó
      </Pill>
    </div>
  </Card>
);

export const StatEducational: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 460 }}>
    <Pill bg="#AEE7F4" color={INK}>
      Anuncios educativos
    </Pill>
    <div style={{ marginTop: 16 }}>
      <StatBox label="GUARDADOS" value="200x" />
      <StatBox label="AGENDAS" value="0" />
    </div>
    <BigNumber value={0} sub="Agendas desde estos anuncios" />
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <Pill bg="#F5C242" color={INK}>
        Nadie agendó
      </Pill>
    </div>
  </Card>
);

const triple = (statusLabel: (i: number) => string, statusBg: string) => (
  <div style={{ display: "flex", gap: 12 }}>
    {["Divertido", "Educativo", "Oferta"].map((label, i) => (
      <Card key={label} style={{ width: 150, padding: 12, textAlign: "center" }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 15 }}>{label}</div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "Archivo Black",
            fontSize: 14,
            background: statusBg,
            border: `2px solid ${INK}`,
            borderRadius: 8,
            padding: "6px 4px",
          }}
        >
          {statusLabel(i)}
        </div>
      </Card>
    ))}
  </div>
);

export const TripleBad: React.FC<{ progress: number }> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
    {triple(() => "¿MAL?", "#fff")}
    <Card style={{ width: 470, textAlign: "center" }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 20 }}>VEREDICTO DE META</div>
      <div style={{ marginTop: 10, fontFamily: "Archivo Black", fontSize: 26, color: "#C0392B" }}>
        NO FUNCIONA PARA NOSOTROS
      </div>
    </Card>
  </div>
);

export const TripleWorked: React.FC<{ progress: number }> = ({ progress }) => {
  const n = Math.ceil(progress * 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      {triple((i) => (i < n ? "✓ FUNCIONÓ" : "…"), "#F5C242")}
      <Card style={{ width: 470 }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 18, marginBottom: 8 }}>
          CÓMO PETER LOS CORRIÓ
        </div>
        <div style={{ fontFamily: "Archivo Black", fontSize: 24, marginBottom: 10 }}>
          UNO A LA VEZ
        </div>
        {["Divertido", "Educativo", "Oferta"].map((l, i) => (
          <div key={l} style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 18, opacity: i < n ? 1 : 0.35 }}>
            paso {i + 1}: {l}
          </div>
        ))}
      </Card>
    </div>
  );
};

export const PitchVC: React.FC<{ progress: number }> = ({ progress }) => (
  <Card style={{ width: 480, textAlign: "center" }}>
    <Pill>Misma lógica de Peter</Pill>
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18 }}>
      <div>
        <div style={{ fontFamily: "Archivo Black", fontSize: 60 }}>1</div>
        <div style={{ fontFamily: "Inter", fontWeight: 700 }}>inversionista</div>
      </div>
      <div style={{ opacity: progress > 0.4 ? 1 : 0.25 }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 40, color: "#C0392B" }}>1 NO</div>
        <div style={{ fontFamily: "Inter", fontWeight: 700 }}>respuesta</div>
      </div>
    </div>
    <div style={{ marginTop: 16, fontFamily: "Archivo Black", fontSize: 20 }}>
      “LEVANTAR CAPITAL NO FUNCIONA”
    </div>
  </Card>
);

export const SeedRound: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 460 }}>
    <Pill bg="#F5C242" color={INK}>
      Term sheet
    </Pill>
    <div style={{ marginTop: 16 }}>
      <StatBox label="ETAPA" value="SEMILLA" />
      <StatBox label="INVERSIONISTAS" value="1" />
      <StatBox label="LÍDER" value="TÍO" />
    </div>
    <div style={{ textAlign: "center", marginTop: 12, fontFamily: "Archivo Black", fontSize: 22 }}>
      SE NOTA.
    </div>
  </Card>
);

export const Moments: React.FC<{ progress: number }> = ({ progress }) => {
  const active = progress < 0.18 ? 0 : progress < 0.5 ? 1 : progress < 0.82 ? 2 : 3;
  const items = [
    { t: "Algo está mal", d: "pero no sabe qué lo arregla" },
    { t: "Aprende la solución", d: "empieza a comparar" },
    { t: "Está listo", d: "te compara con todo lo demás" },
  ];
  return (
    <Card style={{ width: 520 }}>
      <Pill>Tu comprador · 3 momentos</Pill>
      <div style={{ marginTop: 14 }}>
        {items.map((it, i) => (
          <div
            key={it.t}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              border: `2px solid ${INK}`,
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 10,
              background: active === i + 1 ? "#F5C242" : "#fff",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `2px solid ${INK}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Archivo Black",
                background: "#fff",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: "Archivo Black", fontSize: 20 }}>{it.t}</div>
              <div style={{ fontFamily: "Inter", fontSize: 14, color: "#555" }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const Mapping: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 500 }}>
    {[
      ["Divertido", "Momento 1"],
      ["Educativo", "Momento 2"],
      ["Oferta", "Momento 3"],
    ].map(([a, b]) => (
      <div
        key={a}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `2px solid ${INK}`,
          borderRadius: 10,
          padding: "10px 16px",
          marginBottom: 8,
          fontFamily: "Archivo Black",
          fontSize: 18,
        }}
      >
        <span>{a}</span>
        <span>→</span>
        <span>{b}</span>
      </div>
    ))}
    <div style={{ background: "#F5C242", border: `2px solid ${INK}`, borderRadius: 10, padding: 12, marginTop: 10, textAlign: "center" }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 20 }}>1 ANUNCIO = 1 MOMENTO</div>
      <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13 }}>...y te perdiste los otros dos</div>
    </div>
  </Card>
);

export const WhichAd: React.FC<{ progress: number }> = ({ progress }) => {
  const n = progress > 0.5 ? 3 : 0;
  return (
    <Card style={{ width: 500 }}>
      <Pill>¿Cuál anuncio es el correcto?</Pill>
      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
        {["Divertido", "Educativo", "Oferta"].map((l) => (
          <Pill key={l} bg={n === 3 ? "#A9E8A0" : "#fff"} color={INK}>
            {l} {n === 3 ? "✓" : ""}
          </Pill>
        ))}
      </div>
      <div style={{ marginTop: 16, textAlign: "center", fontFamily: "Archivo Black", fontSize: 22 }}>
        UNA SOLA CAMPAÑA
      </div>
    </Card>
  );
};

export const SwarmTitle: React.FC<{ progress: number }> = () => (
  <div style={{ textAlign: "center", position: "relative" }}>
    {["ATENCIÓN", "ENSEÑANZA", "CIERRE"].map((l, i) => (
      <div
        key={l}
        style={{
          position: "absolute",
          top: -140 + i * 40,
          left: -160 + i * 160,
          background: ["#FF4FA3", "#AEE7F4", "#A9E8A0"][i],
          border: `2px solid ${INK}`,
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: "Archivo Black",
          fontSize: 16,
          transform: `rotate(${(i - 1) * 8}deg)`,
        }}
      >
        {l}
      </div>
    ))}
    <div style={{ fontFamily: "Archivo Black", fontSize: 54, lineHeight: 1.05, maxWidth: 640 }}>
      LA ESTRATEGIA DEL ENJAMBRE.
    </div>
  </div>
);

const AdTypeHeader: React.FC<{
  moment: string;
  type: string;
  title: string;
  subtitle: string;
  formats: string[];
  children?: React.ReactNode;
}> = ({ moment, type, title, subtitle, formats, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
    <div style={{ display: "flex", gap: 8 }}>
      <Pill bg="#fff" color={INK}>{moment}</Pill>
      <Pill bg="#fff" color={INK}>{type}</Pill>
    </div>
    <div style={{ fontFamily: "Archivo Black", fontSize: 32, textAlign: "center" }}>{title}</div>
    <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 16, textAlign: "center", maxWidth: 380 }}>
      {subtitle}
    </div>
    <div style={{ display: "flex", gap: 20, width: 520 }}>
      <Card style={{ width: 170, padding: 14 }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 13, marginBottom: 8 }}>FORMATOS</div>
        {formats.map((f) => (
          <div key={f} style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
            ✓ {f}
          </div>
        ))}
      </Card>
      <Card style={{ width: 310 }}>{children}</Card>
    </div>
  </div>
);

export const AttentionAds: React.FC<{ progress: number }> = ({ progress }) => {
  const step = progress < 0.2 ? 0 : progress < 0.5 ? 1 : progress < 0.8 ? 2 : 3;
  return (
    <AdTypeHeader
      moment="Momento 1"
      type="Anuncio 1 de 3"
      title="ANUNCIOS DE ATENCIÓN"
      subtitle="para gente que siente el dolor"
      formats={["Meme", "Sketch", "Oferta audaz"]}
    >
      {step <= 1 && (
        <div>
          <div style={{ fontFamily: "Archivo Black", fontSize: 14 }}>TU EMPRESA</div>
          <div style={{ background: "#F5C242", border: `2px solid ${INK}`, borderRadius: 8, padding: 8, marginTop: 6, fontFamily: "Inter", fontWeight: 800, fontSize: 15 }}>
            actualizando el CRM
          </div>
          <div style={{ marginTop: 6, fontFamily: "Archivo Black" }}>11:00 PM</div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div style={{ fontFamily: "Archivo Black", fontSize: 14 }}>JUNTA DIRECTIVA</div>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {[40, 60, 30, 70].map((h, i) => (
              <div key={i} style={{ width: 16, height: h, background: "#111", borderRadius: 3 }} />
            ))}
          </div>
          <Pill bg="#A9E8A0" color={INK} style={{ marginTop: 8, fontSize: 12 }}>
            “se ve saludable”
          </Pill>
        </div>
      )}
      {step === 3 && (
        <div style={{ textAlign: "center" }}>
          <Pill bg="#111" style={{ fontSize: 12 }}>OFERTA</Pill>
          <div style={{ fontFamily: "Archivo Black", fontSize: 20, marginTop: 8 }}>
            NO PUEDEN IGNORARLA
          </div>
        </div>
      )}
    </AdTypeHeader>
  );
};

export const Pushback: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 480, textAlign: "center" }}>
    <div style={{ fontFamily: "Archivo Black", fontSize: 30 }}>¿MEMES?</div>
    <div style={{ fontFamily: "Archivo Black", fontSize: 22, marginTop: 10 }}>
      “SOMOS UNA EMPRESA ENTERPRISE.”
    </div>
    <div style={{ marginTop: 14, fontFamily: "Inter", fontWeight: 800, fontSize: 18 }}>
      “Nuestros compradores son gente seria.”
    </div>
  </Card>
);

export const Comeback: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 480 }}>
    <div style={{ fontFamily: "Archivo Black", fontSize: 20, textAlign: "center", marginBottom: 10 }}>
      GENTE SERIA QUE MANDA MEMES
    </div>
    <div style={{ border: `2px solid ${INK}`, borderRadius: 10, padding: 12 }}>
      {["meme sobre su jefe", "meme sobre su jefe", "meme sobre su jefe"].map((m, i) => (
        <div key={i} style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 14, borderBottom: i < 2 ? `1px solid #ddd` : undefined, padding: "6px 0" }}>
          💬 {m}
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 8, fontFamily: "Archivo Black", fontSize: 14, color: "#555" }}>
      TODO EL DÍA
    </div>
  </Card>
);

export const TeachingAds: React.FC<{ progress: number }> = ({ progress }) => {
  const step = progress < 0.3 ? 0 : progress < 0.65 ? 1 : 2;
  return (
    <AdTypeHeader
      moment="Momento 2"
      type="Anuncio 2 de 3"
      title="ANUNCIOS DE ENSEÑANZA"
      subtitle="conocen la solución pero no han elegido a quién"
      formats={["Pizarrón", "Loom"]}
    >
      {step === 0 && (
        <div>
          <div style={{ fontFamily: "Archivo Black", fontSize: 14 }}>SU LISTA CORTA</div>
          {["Opción A", "Opción B", "Tú"].map((o) => (
            <div key={o} style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter", fontWeight: 700, fontSize: 14, marginTop: 6 }}>
              <span>{o}</span>
              <span style={{ color: o === "Tú" ? "#2E7D32" : "#999" }}>
                {o === "Tú" ? "CONOCIDO ✓" : "sin elegir"}
              </span>
            </div>
          ))}
        </div>
      )}
      {step >= 1 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100%",
              height: 90,
              background: "#111",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 34,
            }}
          >
            ▶
          </div>
          <div style={{ fontFamily: "Archivo Black", fontSize: 14, marginTop: 8 }}>
            UN LOOM EXPLICANDO
          </div>
          <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 12, color: "#666" }}>
            cómo funciona el problema
          </div>
        </div>
      )}
    </AdTypeHeader>
  );
};

export const OneThought: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 460, textAlign: "center" }}>
    <div style={{ fontFamily: "Archivo Black", fontSize: 20 }}>
      UN SOLO PENSAMIENTO EN SU CABEZA
    </div>
    <div
      style={{
        marginTop: 16,
        background: "#F5C242",
        border: `2px solid ${INK}`,
        borderRadius: 12,
        padding: 18,
        fontFamily: "Archivo Black",
        fontSize: 22,
      }}
    >
      “ESTA PERSONA SABE
      <br />
      DE LO QUE HABLA.”
    </div>
  </Card>
);

export const PeterAsksSaved: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 470 }}>
    <Pill bg="#F5C242" color={INK}>Anuncio educativo</Pill>
    <div style={{ marginTop: 14 }}>
      <StatBox label="GUARDADOS" value="200x" />
      <StatBox label="AGENDADOS" value="0" />
    </div>
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <Pill bg="#C0392B">NUNCA CONVIRTIÓ</Pill>
    </div>
  </Card>
);

export const MaybeLaterFolder: React.FC<{ progress: number }> = () => (
  <Card style={{ width: 460 }}>
    <div style={{ fontFamily: "Archivo Black", fontSize: 16, textAlign: "center" }}>
      CARPETA DEL INVERSIONISTA
    </div>
    <div style={{ display: "flex", gap: 14, marginTop: 14, justifyContent: "center" }}>
      <div style={{ border: `2px dashed ${INK}`, borderRadius: 10, padding: "18px 14px", textAlign: "center" }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 13 }}>TU DECK</div>
      </div>
      <div style={{ border: `2px solid ${INK}`, borderRadius: 10, padding: "18px 14px", textAlign: "center", background: "#F5C242" }}>
        <div style={{ fontFamily: "Archivo Black", fontSize: 13 }}>TU ANUNCIO GUARDADO</div>
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: 10, fontFamily: "Archivo Black", fontSize: 18 }}>
      “TAL VEZ DESPUÉS”
    </div>
  </Card>
);

export const ClosingAds: React.FC<{ progress: number }> = ({ progress }) => (
  <AdTypeHeader
    moment="Momento 3"
    type="Anuncio 3 de 3"
    title="ANUNCIOS DE CIERRE"
    subtitle="para quienes ya están listos"
    formats={["Piloto pagado"]}
  >
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 22 }}>PILOTO PAGADO</div>
      <div
        style={{
          marginTop: 8,
          fontFamily: "Archivo Black",
          fontSize: 16,
          background: progress > 0.4 ? "#F5C242" : "#fff",
          border: `2px solid ${INK}`,
          borderRadius: 8,
          padding: 8,
        }}
      >
        RESULTADOS POR ESCRITO
      </div>
    </div>
  </AdTypeHeader>
);

export const Versus: React.FC<{ progress: number }> = ({ progress }) => {
  const second = progress > 0.55;
  return (
    <Card style={{ width: 460, textAlign: "center" }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 24 }}>TÚ</div>
      <div
        style={{
          background: "#111",
          color: "#fff",
          display: "inline-block",
          borderRadius: 999,
          padding: "4px 14px",
          fontFamily: "Archivo Black",
          margin: "8px 0",
        }}
      >
        VS
      </div>
      <div style={{ fontFamily: "Archivo Black", fontSize: 20 }}>
        {second ? "“LO CONSTRUIMOS NOSOTROS MISMOS”" : "CONTRATAR 2 SDRs MÁS"}
      </div>
    </Card>
  );
};

export const WhyOneCampaignTitle: React.FC<{ progress: number }> = () => (
  <div style={{ fontFamily: "Archivo Black", fontSize: 46, textAlign: "center", maxWidth: 640, lineHeight: 1.1 }}>
    ¿POR QUÉ PONER LOS TRES EN UNA SOLA CAMPAÑA?
  </div>
);

export const Funnel: React.FC<{ progress: number }> = ({ progress }) => {
  const n = Math.ceil(progress * 3);
  const labels = ["Siente el dolor", "Buscando opciones", "Listo"];
  const colors = ["#FF4FA3", "#AEE7F4", "#A9E8A0"];
  return (
    <Card style={{ width: 520 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {["ATENCIÓN", "ENSEÑANZA", "CIERRE"].map((l, i) => (
          <Pill key={l} bg={colors[i]} color={INK} style={{ fontSize: 12 }}>
            {l}
          </Pill>
        ))}
      </div>
      <div style={{ textAlign: "center", fontFamily: "Archivo Black", fontSize: 30, margin: "10px 0" }}>∞ META</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {labels.map((l, i) => (
          <div
            key={l}
            style={{
              border: `2px solid ${INK}`,
              borderRadius: 8,
              padding: "10px 8px",
              width: 130,
              textAlign: "center",
              background: i < n ? colors[i] : "#fff",
              fontFamily: "Inter",
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 10, fontFamily: "Archivo Black", fontSize: 14 }}>
        CADA PERSONA VE EL ANUNCIO CORRECTO
      </div>
    </Card>
  );
};

export const WeeklyCalendar: React.FC<{ progress: number }> = ({ progress }) => {
  const days = ["LUN", "MAR", "MIÉ", "JUE", "VIE"];
  const content = ["MEME", "", "PIZARRÓN", "", "PILOTO"];
  const markerX = interpolate(progress, [0, 1], [0, 4]);
  return (
    <Card style={{ width: 540 }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 16, textAlign: "center", marginBottom: 12 }}>
        EL MISMO COMPRADOR, TODA LA SEMANA
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {days.map((d, i) => (
          <div key={d} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "Archivo Black", fontSize: 12, marginBottom: 6 }}>{d}</div>
            <div
              style={{
                border: `2px solid ${INK}`,
                borderRadius: 8,
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: content[i] ? "#F5C242" : "#fff",
                fontFamily: "Inter",
                fontWeight: 800,
                fontSize: 11,
                textAlign: "center",
                padding: 4,
              }}
            >
              {content[i]}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", height: 24, marginTop: 10 }}>
        <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 2, background: INK }} />
        <div
          style={{
            position: "absolute",
            top: 2,
            left: `${(markerX / 4) * 96}%`,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#111",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 6, fontFamily: "Archivo Black", fontSize: 12, color: "#555" }}>
        COMPRADOR
      </div>
    </Card>
  );
};

export const FormFill: React.FC<{ progress: number }> = ({ progress }) => {
  const n = Math.ceil(progress * 3);
  const fields = ["Nombre", "Empresa", "Correo"];
  return (
    <Card style={{ width: 460 }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 16, textAlign: "center" }}>
        RESERVA UNA DEMO — TUMARCA.COM
      </div>
      <div style={{ marginTop: 12 }}>
        {fields.map((f, i) => (
          <div key={f} style={{ border: `2px solid ${INK}`, borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontFamily: "Inter", fontWeight: 700, fontSize: 14, background: i < n ? "#F7F1E4" : "#fff" }}>
            {i < n ? `${f}: ✓` : f}
          </div>
        ))}
        <div style={{ background: "#111", color: "#fff", textAlign: "center", borderRadius: 8, padding: "10px 0", fontFamily: "Archivo Black" }}>
          RESERVAR DEMO
        </div>
      </div>
      <div style={{ marginTop: 10, textAlign: "center", fontFamily: "Archivo Black", fontSize: 13 }}>
        SIENTEN QUE YA TE CONOCEN
      </div>
    </Card>
  );
};

export const NoneBadTitle: React.FC<{ progress: number }> = () => (
  <div style={{ fontFamily: "Archivo Black", fontSize: 44, textAlign: "center", maxWidth: 600 }}>
    ¿ENTONCES NINGUNO ERA MALO?
  </div>
);

export const VerdictRecap: React.FC<{ progress: number }> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
    {triple(() => "NO ESTABA MAL", "#A9E8A0")}
    <Card style={{ width: 480, textAlign: "center" }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 15 }}>TU ÚNICO ANUNCIO, PEDIDO PARA:</div>
      <div style={{ fontFamily: "Archivo Black", fontSize: 22, marginTop: 8 }}>
        CAPTAR ATENCIÓN · ENSEÑAR · CERRAR
      </div>
      <div style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 15, marginTop: 6, color: "#C0392B" }}>
        TODO EL TRABAJO, SOLO
      </div>
    </Card>
  </div>
);

export const Headcount: React.FC<{ progress: number }> = ({ progress }) => (
  <Card style={{ width: 460 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "Archivo Black", fontSize: 18 }}>TU EQUIPO DE MARKETING</span>
      <span style={{ background: "#F5C242", border: `2px solid ${INK}`, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Archivo Black", fontSize: 22 }}>
        1
      </span>
    </div>
    <div style={{ border: `2px solid ${INK}`, borderRadius: 10, padding: 14, marginTop: 14 }}>
      <div style={{ fontFamily: "Archivo Black", fontSize: 15 }}>TU EQUIPO DE UNA PERSONA</div>
      <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13, marginTop: 6, color: "#555" }}>
        Hace la atención, la enseñanza y el cierre. Sola.
      </div>
      <div
        style={{
          marginTop: 12,
          textAlign: "center",
          background: progress > 0.5 ? "#A9E8A0" : "#fff",
          border: `2px solid ${INK}`,
          borderRadius: 8,
          padding: 8,
          fontFamily: "Archivo Black",
          fontSize: 13,
        }}
      >
        LINKEDIN: DISPONIBLE PARA TRABAJAR
      </div>
    </div>
  </Card>
);

export const CTA: React.FC<{ progress: number }> = () => (
  <div style={{ textAlign: "center" }}>
    <Pill bg="#F5C242" color={INK} style={{ marginBottom: 16 }}>
      Conoce el playbook
    </Pill>
    <div style={{ fontFamily: "Archivo Black", fontSize: 58, color: "#fff", lineHeight: 1.05 }}>
      COMENTA
      <br />
      “PETER”
    </div>
    <div
      style={{
        marginTop: 22,
        background: "#fff",
        border: `3px solid #fff`,
        borderRadius: 14,
        padding: 16,
        maxWidth: 380,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ fontFamily: "Archivo Black", fontSize: 14, textAlign: "left" }}>PETER</div>
      <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13, textAlign: "left", color: "#555" }}>
        te enviaré el SOP:
      </div>
      <div style={{ fontFamily: "Archivo Black", fontSize: 16, textAlign: "left", marginTop: 4 }}>
        LA ESTRATEGIA DEL ENJAMBRE
      </div>
    </div>
  </div>
);

export const ShotMap: Record<string, React.FC<{ progress: number }>> = {
  TestLog,
  StatFunny,
  StatEducational,
  TripleBad,
  TripleWorked,
  PitchVC,
  SeedRound,
  Moments,
  Mapping,
  WhichAd,
  SwarmTitle,
  AttentionAds,
  Pushback,
  Comeback,
  TeachingAds,
  OneThought,
  PeterAsksSaved,
  MaybeLaterFolder,
  ClosingAds,
  Versus,
  WhyOneCampaignTitle,
  Funnel,
  WeeklyCalendar,
  FormFill,
  NoneBadTitle,
  VerdictRecap,
  Headcount,
  CTA,
};

// ============================================================
// Leitor próprio de arquivos OBJ
// Implementado manualmente, sem uso de bibliotecas externas.
// Suporta: v, vt, vn, f (com e sem texcoord/normal)
// ============================================================

function parseOBJ(text) {
    var positions   = [];  // vec3
    var texcoords   = [];  // vec2
    var normals_raw = [];  // vec3

    var out_positions = [];
    var out_texcoords = [];
    var out_normals   = [];

    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line === '' || line[0] === '#') continue;

        var parts = line.split(/\s+/);
        var keyword = parts[0];

        if (keyword === 'v') {
            positions.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);
        } else if (keyword === 'vt') {
            texcoords.push([
                parseFloat(parts[1]),
                parseFloat(parts[2])
            ]);
        } else if (keyword === 'vn') {
            normals_raw.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);
        } else if (keyword === 'f') {
            // Triangularização de polígonos (fan)
            var faceVerts = [];
            for (var j = 1; j < parts.length; j++) {
                faceVerts.push(parts[j]);
            }
            for (var j = 1; j < faceVerts.length - 1; j++) {
                var tri = [faceVerts[0], faceVerts[j], faceVerts[j + 1]];
                for (var k = 0; k < 3; k++) {
                    var idx = tri[k].split('/');
                    var vi  = parseInt(idx[0]) - 1;
                    var vt  = idx[1] && idx[1] !== '' ? parseInt(idx[1]) - 1 : -1;
                    var vn  = idx[2] && idx[2] !== '' ? parseInt(idx[2]) - 1 : -1;

                    var p = positions[vi] || [0, 0, 0];
                    out_positions.push(p[0], p[1], p[2]);

                    if (vt >= 0 && texcoords[vt]) {
                        out_texcoords.push(texcoords[vt][0], texcoords[vt][1]);
                    } else {
                        out_texcoords.push(0, 0);
                    }

                    if (vn >= 0 && normals_raw[vn]) {
                        out_normals.push(normals_raw[vn][0], normals_raw[vn][1], normals_raw[vn][2]);
                    } else {
                        out_normals.push(0, 1, 0);
                    }
                }
            }
        }
    }

    return {
        positions: new Float32Array(out_positions),
        texcoords: new Float32Array(out_texcoords),
        normals:   new Float32Array(out_normals),
        vertexCount: out_positions.length / 3
    };
}

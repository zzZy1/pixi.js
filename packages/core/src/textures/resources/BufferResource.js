import TextureResource from './TextureResource';

export default class BufferResource extends TextureResource
{
    constructor(data, width, height)
    {
        super();

        /**
         * Source array
         * Cannot be ClampedUint8Array because it cant be uploaded to WebGL
         *
         * @member {Float32Array|Uint8Array|Uint32Array}
         */
        this.data = data;
        this.width = width;
        this.height = height;

        this.loaded = true;
        this.load = Promise.resolve();
    }

    onTextureNew(baseTexture)
    {
        baseTexture.setRealSize(this.width, this.height);
    }

    onTextureUpload(renderer, baseTexture, glTexture)
    {
        const gl = renderer.gl;

        gl.texImage2D(baseTexture.target,
            0,
            baseTexture.format,
            baseTexture.width,
            baseTexture.height,
            0,
            baseTexture.format,
            baseTexture.type,
            this.data);

        return true;
    }

    static from(array)
    {
        return new BufferResource(array);
    }
}

/**
 * Fixed blur/fade bands at the top and bottom of the viewport, so content
 * scrolling through gets a feathered blur-out rather than a hard clip.
 */
export default function EdgeMasks() {
  return (
    <>
      <div className="edge-mask-top" aria-hidden="true" />
      <div className="edge-mask-bottom" aria-hidden="true" />
    </>
  )
}

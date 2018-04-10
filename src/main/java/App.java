public class App {

  @SuppressWarnings("PMD.SystemPrintln")
  public static void main(String... args) {
    final boolean result = new Library().someLibraryMethod();
    System.out.println(result);
  }
}
